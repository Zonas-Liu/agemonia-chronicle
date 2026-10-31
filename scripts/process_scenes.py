#!/usr/bin/env python3
"""Crop and compress generated chronicle art for the website."""
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
IMAGES = ROOT / "public" / "images"
JOBS = {
    "raw-ch7-statue.png": "banner-ch7.jpg",
    "raw-ch7-door.png": "scene-ch7-door.jpg",
    "raw-ch7-spider.png": "scene-ch7-spider.jpg",
    "raw-ch8-pillar.png": "banner-ch8.jpg",
    "raw-ch8-graznak.png": "scene-ch8-graznak.jpg",
    "raw-ch8-portal.png": "scene-ch8-portal.jpg",
    "raw-ch9-hydra.png": "banner-ch9.jpg",
    "raw-ch9-shrine.png": "scene-ch9-shrine.jpg",
}

for source, target in JOBS.items():
    src = IMAGES / "gen" / source
    if not src.exists():
        print(f"SKIP missing {source}")
        continue
    dst = IMAGES / target
    with Image.open(src) as im:
        fitted = ImageOps.fit(im.convert("RGB"), (1600, 850), Image.Resampling.LANCZOS)
        fitted.save(dst, "JPEG", quality=88, optimize=True, progressive=True)
    print(f"OK {target}: {dst.stat().st_size} bytes")
