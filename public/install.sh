#!/usr/bin/env bash
set -euo pipefail

# tmuxonwatch Server Installer
# Usage: bash install.sh
# Or:    bash <(curl -sSL tmuxonwatch.com/install)

BOLD='\033[1m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
RESET='\033[0m'

# Auto-detect script location if run from repo, otherwise default to ~/tmuxonwatch/server
if [[ -f "${BASH_SOURCE[0]:-}" ]]; then
    SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    if [[ -f "$SCRIPT_DIR/server/main.py" ]]; then
        INSTALL_DIR="$SCRIPT_DIR/server"
    else
        INSTALL_DIR="$HOME/tmuxonwatch/server"
    fi
else
    INSTALL_DIR="$HOME/tmuxonwatch/server"
fi
CONFIG_DIR="$HOME/.config/tmuxonwatch"
PLIST_NAME="com.tmuxonwatch.server"
PLIST_DEST="$HOME/Library/LaunchAgents/$PLIST_NAME.plist"
PORT=8787

info()  { echo -e "${CYAN}=>${RESET} $1"; }
ok()    { echo -e "${GREEN}✓${RESET} $1"; }
warn()  { echo -e "${YELLOW}!${RESET} $1"; }
fail()  { echo -e "${RED}✗ $1${RESET}"; exit 1; }

echo ""
echo -e "${BOLD}tmuxonwatch Server Installer${RESET}"
echo "─────────────────────────────────"
echo ""

# ── Check prerequisites ───────────────────────────────────
info "Checking prerequisites..."

if [[ "$(uname)" != "Darwin" ]]; then
    fail "tmuxonwatch server requires macOS."
fi

# Find Python 3.9+
PYTHON=""
for candidate in python3 python; do
    if command -v "$candidate" &>/dev/null; then
        version=$("$candidate" -c 'import sys; print(f"{sys.version_info.major}.{sys.version_info.minor}")' 2>/dev/null || echo "0.0")
        major="${version%%.*}"
        minor="${version#*.}"
        if [[ "$major" -ge 3 && "$minor" -ge 9 ]]; then
            PYTHON="$candidate"
            break
        fi
    fi
done

if [[ -z "$PYTHON" ]]; then
    fail "Python 3.9+ required. Install via: brew install python3"
fi
ok "Found $($PYTHON --version)"

if ! command -v tmux &>/dev/null; then
    fail "tmux not found. Install via: brew install tmux"
fi
ok "Found tmux $(tmux -V | awk '{print $2}')"

# ── Clone / update server files ──────────────────────────
if [[ -d "$INSTALL_DIR" ]]; then
    info "Server directory exists at $INSTALL_DIR"
else
    info "Creating server directory..."
    mkdir -p "$INSTALL_DIR"
    warn "You'll need to copy server files to $INSTALL_DIR"
    warn "(main.py, tmux_bridge.py, ansi_parser.py, requirements.txt)"
fi

# ── Create virtual environment ────────────────────────────
info "Setting up Python virtual environment..."
if [[ ! -d "$INSTALL_DIR/.venv" ]]; then
    "$PYTHON" -m venv "$INSTALL_DIR/.venv"
    ok "Created venv"
else
    ok "Venv already exists"
fi

info "Installing dependencies..."
"$INSTALL_DIR/.venv/bin/pip" install -q -r "$INSTALL_DIR/requirements.txt" 2>/dev/null || {
    "$INSTALL_DIR/.venv/bin/pip" install -q fastapi "uvicorn[standard]"
}
# Install qrcode so QR always works in the terminal
"$INSTALL_DIR/.venv/bin/pip" install -q qrcode 2>/dev/null || true
ok "Dependencies installed"

# ── Generate token ────────────────────────────────────────
mkdir -p "$CONFIG_DIR"

if [[ -f "$CONFIG_DIR/env" ]]; then
    source "$CONFIG_DIR/env"
    if [[ "${TP_TOKEN:-changeme}" == "changeme" ]]; then
        TP_TOKEN=$("$PYTHON" -c "import secrets; print(secrets.token_urlsafe(32))")
        echo "export TP_TOKEN=\"$TP_TOKEN\"" > "$CONFIG_DIR/env"
        chmod 600 "$CONFIG_DIR/env"
        ok "Generated new auth token"
    else
        ok "Using existing auth token"
    fi
else
    TP_TOKEN=$("$PYTHON" -c "import secrets; print(secrets.token_urlsafe(32))")
    echo "export TP_TOKEN=\"$TP_TOKEN\"" > "$CONFIG_DIR/env"
    chmod 600 "$CONFIG_DIR/env"
    ok "Generated auth token"
fi

# ── Create launchd plist ──────────────────────────────────
info "Installing launchd service..."

# Unload existing if present
launchctl bootout "gui/$(id -u)/$PLIST_NAME" 2>/dev/null || true

cat > "$PLIST_DEST" << PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
  "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>$PLIST_NAME</string>
    <key>ProgramArguments</key>
    <array>
        <string>/bin/bash</string>
        <string>-c</string>
        <string>source "\$HOME/.config/tmuxonwatch/env" 2>/dev/null; exec "$INSTALL_DIR/.venv/bin/python3" -m uvicorn main:app --host 127.0.0.1 --port $PORT</string>
    </array>
    <key>WorkingDirectory</key>
    <string>$INSTALL_DIR</string>
    <key>EnvironmentVariables</key>
    <dict>
        <key>PATH</key>
        <string>/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin</string>
    </dict>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
    <key>StandardOutPath</key>
    <string>/tmp/tmuxonwatch.out.log</string>
    <key>StandardErrorPath</key>
    <string>/tmp/tmuxonwatch.err.log</string>
</dict>
</plist>
PLIST

launchctl bootstrap "gui/$(id -u)" "$PLIST_DEST" 2>/dev/null || launchctl load "$PLIST_DEST" 2>/dev/null
ok "Service installed and started"

# ── Wait for server ───────────────────────────────────────
info "Waiting for server to start..."
SERVER_STARTED=false
for i in $(seq 1 10); do
    if curl -sf "http://127.0.0.1:$PORT/health" > /dev/null 2>&1; then
        ok "Server is running on port $PORT"
        SERVER_STARTED=true
        break
    fi
    sleep 1
done

if [[ "$SERVER_STARTED" == "false" ]]; then
    warn "Server did not start within 10 seconds."
    warn "Check logs: /tmp/tmuxonwatch.err.log"
    if [[ ! -f "$INSTALL_DIR/main.py" ]]; then
        warn "Server files not found at $INSTALL_DIR — copy main.py, tmux_bridge.py, ansi_parser.py there first."
    fi
fi

# ── Output connection info ────────────────────────────────
SERVER_URL="http://127.0.0.1:$PORT"

echo ""
echo "─────────────────────────────────"
echo -e "${BOLD}${GREEN}Installation complete!${RESET}"
echo ""
echo -e "  Server:  ${CYAN}$SERVER_URL${RESET}"
echo -e "  Token:   ${CYAN}$TP_TOKEN${RESET}"
echo -e "  Config:  ${CYAN}$CONFIG_DIR/env${RESET}"
echo -e "  Logs:    ${CYAN}/tmp/tmuxonwatch.{out,err}.log${RESET}"
echo ""

# ── QR code for iOS pairing ──────────────────────────────
# Encode server URL + token as JSON for QR scanning
QR_PAYLOAD="{\"url\":\"$SERVER_URL\",\"token\":\"$TP_TOKEN\"}"

if command -v qrencode &>/dev/null; then
    echo -e "${BOLD}Scan this QR code in the tmux on watch iOS app:${RESET}"
    echo ""
    echo "$QR_PAYLOAD" | qrencode -t ANSIUTF8
    echo ""
elif "$INSTALL_DIR/.venv/bin/python3" -c "import qrcode" 2>/dev/null; then
    echo -e "${BOLD}Scan this QR code in the tmux on watch iOS app:${RESET}"
    echo ""
    "$INSTALL_DIR/.venv/bin/python3" -c "
import sys, qrcode
qr = qrcode.QRCode(border=1)
qr.add_data(sys.argv[1])
qr.print_ascii(invert=True)
" "$QR_PAYLOAD"
    echo ""
elif command -v "$PYTHON" &>/dev/null; then
    # Try system Python qrcode module
    "$PYTHON" -c "
import sys
try:
    import qrcode
    qr = qrcode.QRCode(border=1)
    qr.add_data(sys.argv[1])
    qr.print_ascii(invert=True)
except ImportError:
    print('To display QR code: pip3 install qrcode  OR  brew install qrencode')
    print()
    print('Manual setup — enter these in the tmux on watch iOS app:')
    print(f'  Server URL: {sys.argv[2]}')
    print(f'  Token:      {sys.argv[3]}')
" "$QR_PAYLOAD" "$SERVER_URL" "$TP_TOKEN" 2>/dev/null || {
    echo "Manual setup — enter these in the tmux on watch iOS app:"
    echo -e "  Server URL: ${CYAN}$SERVER_URL${RESET}"
    echo -e "  Token:      ${CYAN}$TP_TOKEN${RESET}"
}
else
    echo "Manual setup — enter these in the tmux on watch iOS app:"
    echo -e "  Server URL: ${CYAN}$SERVER_URL${RESET}"
    echo -e "  Token:      ${CYAN}$TP_TOKEN${RESET}"
fi

echo ""
echo -e "For Tailscale/remote access, replace 127.0.0.1 with your"
echo -e "machine's Tailscale hostname (e.g. http://my-mac.tail1234.ts.net:$PORT)"
echo ""
