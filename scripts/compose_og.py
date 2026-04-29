#!/usr/bin/env python3
"""OG / Twitter card composer for tmuxonwatch.com.
Outputs public/og.png (EN) and public/og-ja.png (JA) at 1200×630 (Twitter large)."""
from collections import deque
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont

REPO_ROOT = Path(__file__).resolve().parents[1]
HERO_FRAME = REPO_ROOT / "public" / "scroll-watch" / "desktop" / "frame_0121.webp"
OUT_DIR = REPO_ROOT / "public"

JP_FONT = "/System/Library/Fonts/Hiragino Sans GB.ttc"
EN_FONT = "/System/Library/Fonts/HelveticaNeue.ttc"

CANVAS_W, CANVAS_H = 1200, 630
GREEN_GLOW = (56, 255, 96)
INK = (255, 255, 255, 255)
BODY = (235, 235, 235, 200)
DOMAIN = (210, 220, 215, 130)
SAFE = 60

LOCALES = {
    "en": {
        "out": OUT_DIR / "og.png",
        "font": EN_FONT,
        "title": ["tmux on", "your wrist."],
        "title_size": 92,
        "title_lead": 1.02,
        "body": ["Live Mac tmux output on iPhone", "and Apple Watch."],
        "body_size": 28,
        "body_lead": 40,
    },
    "ja": {
        "out": OUT_DIR / "og-ja.png",
        "font": JP_FONT,
        "title": ["手首に、", "tmux。"],
        "title_size": 86,
        "title_lead": 1.04,
        "body": ["MacのtmuxをiPhoneと", "Apple Watchへ、ライブで。"],
        "body_size": 28,
        "body_lead": 40,
    },
}


def font(font_path: str, size: int, bold: bool = True) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(font_path, size, index=(1 if bold else 0))


def screen_mask(bezel_path: Path) -> Image.Image:
    bezel = Image.open(bezel_path).convert("RGBA")
    alpha = bezel.split()[3]
    w, h = bezel.size
    visited = {(w // 2, h // 2)}
    pixels = set()
    q = deque([(w // 2, h // 2)])
    while q:
        x, y = q.popleft()
        if alpha.getpixel((x, y)) > 30:
            continue
        pixels.add((x, y))
        for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nx, ny = x + dx, y + dy
            if 0 <= nx < w and 0 <= ny < h and (nx, ny) not in visited:
                visited.add((nx, ny))
                q.append((nx, ny))
    mask = Image.new("L", bezel.size, 0)
    md = ImageDraw.Draw(mask)
    for (x, y) in pixels:
        md.point((x, y), fill=255)
    return mask


_MASK = None
def get_mask() -> Image.Image:
    global _MASK
    if _MASK is None:
        _MASK = screen_mask(WATCH_BEZEL)
    return _MASK


def watch_mockup(target_w: int, rotate_deg: float = 0.0,
                 crop_top: float = 0.04, crop_bottom: float = 0.04) -> Image.Image:
    bezel = Image.open(WATCH_BEZEL).convert("RGBA")
    mask = get_mask()
    bbox = mask.getbbox()
    sx0, sy0, sx1, sy1 = bbox
    sw, sh = sx1 - sx0, sy1 - sy0
    raw = Image.open(RAW_WATCH).convert("RGBA")
    rw, rh = raw.size
    if rw / rh > sw / sh:
        nh = sh
        nw = int(rw * (nh / rh))
    else:
        nw = sw
        nh = int(rh * (nw / rw))
    raw = raw.resize((nw, nh), Image.LANCZOS)
    cx, cy = (nw - sw) // 2, (nh - sh) // 2
    raw = raw.crop((cx, cy, cx + sw, cy + sh))
    base = Image.new("RGBA", bezel.size, (0, 0, 0, 0))
    base.paste(raw, (sx0, sy0), mask.crop(bbox))
    base.alpha_composite(bezel)
    bw, bh = base.size
    base = base.crop((0, int(bh * crop_top), bw, bh - int(bh * crop_bottom)))
    ratio = target_w / base.width
    base = base.resize((target_w, int(base.height * ratio)), Image.LANCZOS)
    if rotate_deg != 0:
        base = base.rotate(rotate_deg, expand=True, resample=Image.BICUBIC)
    return base


def background() -> Image.Image:
    img = Image.new("RGBA", (CANVAS_W, CANVAS_H), (0, 0, 0, 255))
    d = ImageDraw.Draw(img, "RGBA")
    for y in range(CANVAS_H):
        t = y / CANVAS_H
        v = int(2 + 9 * t)
        d.line((0, y, CANVAS_W, y), fill=(v, v + 1, v, 255))
    glow = Image.new("RGBA", (CANVAS_W, CANVAS_H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow, "RGBA")
    # top-right glow
    gd.ellipse((int(CANVAS_W * 0.55), int(-CANVAS_H * 0.30),
                int(CANVAS_W * 1.15), int(CANVAS_H * 0.25)),
               fill=(*GREEN_GLOW, 28))
    # bottom-left glow
    gd.ellipse((int(-CANVAS_W * 0.10), int(CANVAS_H * 0.78),
                int(CANVAS_W * 0.18), int(CANVAS_H * 1.18)),
               fill=(*GREEN_GLOW, 18))
    img = Image.alpha_composite(img, glow.filter(ImageFilter.GaussianBlur(160)))
    return img


def add_watch_shadow(base: Image.Image, watch: Image.Image, xy: tuple[int, int]) -> None:
    x, y = xy
    alpha = watch.split()[3]
    shadow = Image.new("RGBA", watch.size, (0, 0, 0, 180))
    shadow.putalpha(alpha.filter(ImageFilter.GaussianBlur(60)))
    base.alpha_composite(shadow, (x + 14, y + 36))
    base.alpha_composite(watch, (x, y))


def text_block(d: ImageDraw.ImageDraw, lines: list[str], xy: tuple[int, int],
               size: int, font_path: str, fill, lead: float) -> int:
    f = font(font_path, size, bold=True)
    x, y = xy
    cy = y
    for line in lines:
        d.text((x, cy), line, font=f, fill=fill)
        cy += int(size * lead)
    return cy


def body_block(d: ImageDraw.ImageDraw, lines: list[str], xy: tuple[int, int],
               size: int, font_path: str, fill, lead: int) -> int:
    f = font(font_path, size, bold=False)
    x, y = xy
    for line in lines:
        d.text((x, y), line, font=f, fill=fill)
        y += lead
    return y


def render(loc_key: str) -> Path:
    cfg = LOCALES[loc_key]
    img = background()
    d = ImageDraw.Draw(img, "RGBA")

    # Text on left half
    text_x = SAFE
    title_y = 130
    end_title_y = text_block(d, cfg["title"], (text_x, title_y),
                              cfg["title_size"], cfg["font"], INK, cfg["title_lead"])
    body_y = end_title_y + 32
    body_block(d, cfg["body"], (text_x, body_y),
               cfg["body_size"], cfg["font"], BODY, cfg["body_lead"])

    # Domain mark bottom-left
    f_dom = font(EN_FONT, 22, bold=False)
    d.text((SAFE, CANVAS_H - 60), "tmuxonwatch.com", font=f_dom, fill=DOMAIN)

    # Hero: final frame of WatchScrollSequence — pin to bottom-right, expand from corner.
    # Source frame is 1264×720 with watch centered on black; crop tight, scale,
    # use the frame's own luminance as alpha so its black background dissolves into
    # our gradient (only the watch hardware + screen content stays visible).
    hero = Image.open(HERO_FRAME).convert("RGB")
    hero = hero.crop((430, 0, 840, 720))  # 410×720 — watch + immediate strap context
    target_h = 720
    ratio = target_h / hero.height
    hero = hero.resize((int(hero.width * ratio), target_h), Image.LANCZOS)
    # Build alpha from luminance: dark pixels → transparent, bright → opaque.
    lum = hero.convert("L")
    # Lift mids so soft strap edges aren't ghostly; clamp blacks to 0.
    lum = lum.point(lambda v: 0 if v < 18 else min(255, int((v - 18) * 1.30)))
    hero_rgba = hero.convert("RGBA")
    hero_rgba.putalpha(lum)
    # Pin the bottom-right of the hero just past the canvas BR for a clean bleed.
    hx = CANVAS_W - hero_rgba.width + 50   # bleed ~50px off right
    hy = CANVAS_H - hero_rgba.height + 90  # bleed ~90px off bottom
    img.alpha_composite(hero_rgba, (hx, hy))

    out = cfg["out"]
    img.convert("RGB").save(out, "PNG", optimize=True)
    return out


if __name__ == "__main__":
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for loc in ("en", "ja"):
        p = render(loc)
        print(f"wrote {p}")
