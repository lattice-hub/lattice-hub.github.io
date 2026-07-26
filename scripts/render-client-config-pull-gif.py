#!/usr/bin/env python3
"""Render a terminal-style GIF of real client GetConfigFile pulls."""

from __future__ import annotations

import json
import subprocess
import urllib.parse
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

CLIENT_BASE = "http://127.0.0.1:8090"
NS = "default"
GROUP = "docs-multi-gray"
FILE = "app.yaml"
OUT_DIR = Path("/tmp/config-client-pull-demo/frames")
GIF_OUT = Path(__file__).resolve().parents[1] / "public/images/console/config-multi-gray-demo.gif"
W, H = 1280, 720
BG = (18, 20, 24)
FG = (230, 233, 238)
DIM = (140, 148, 160)
GREEN = (110, 220, 150)
CYAN = (120, 200, 230)
YELLOW = (240, 200, 110)
ORANGE = (255, 160, 100)


def font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    for path in (
        "/System/Library/Fonts/Supplemental/Menlo.ttc",
        "/System/Library/Fonts/Monaco.ttf",
        "/Library/Fonts/SF-Mono-Regular.otf",
        "/System/Library/Fonts/SFNSMono.ttf",
    ):
        try:
            return ImageFont.truetype(path, size)
        except OSError:
            continue
    return ImageFont.load_default()


def pull(tags: str | None) -> dict:
    q = {
        "namespace": NS,
        "group": GROUP,
        "fileName": FILE,
        "version": "0",
    }
    url = f"{CLIENT_BASE}/v1/GetConfigFile?{urllib.parse.urlencode(q)}"
    if tags:
        url += f"&tags={urllib.parse.quote(tags)}"
    raw = subprocess.check_output(["curl", "-sS", url], text=True)
    return json.loads(raw)


def draw_frame(lines: list[tuple[str, tuple[int, int, int]]], title: str) -> Image.Image:
    img = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img)
    title_f = font(28)
    body_f = font(22)
    draw.rectangle((0, 0, W, 56), fill=(28, 32, 40))
    draw.text((28, 14), title, fill=CYAN, font=title_f)
    y = 84
    for text, color in lines:
        draw.text((36, y), text, fill=color, font=body_f)
        y += 30
        if y > H - 40:
            break
    return img


def fmt_resp(resp: dict) -> list[tuple[str, tuple[int, int, int]]]:
    file = resp.get("file") or {}
    content = (file.get("content") or "").rstrip("\n")
    lines: list[tuple[str, tuple[int, int, int]]] = [
        (f'code: {resp.get("code")}  info: {resp.get("info")}', DIM),
        (f'release_name: {file.get("name")}', YELLOW),
        (f'release_type: {file.get("release_type")}   version: {file.get("version")}', ORANGE),
        ("content:", DIM),
    ]
    for row in content.splitlines() or ["<empty>"]:
        lines.append((f"  {row}", GREEN))
    return lines


def save(img: Image.Image, name: str, seconds: float, playlist: list[tuple[Path, float]]) -> None:
    path = OUT_DIR / name
    img.save(path)
    playlist.append((path, seconds))


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    playlist: list[tuple[Path, float]] = []

    cases = [
        ("no-tags", None, "Client without tags → formal (normal) baseline"),
        ("gray-a", "env=gray-a", "Client tags=env=gray-a → gray release A"),
        ("gray-b", "env=gray-b", "Client tags=env=gray-b → gray release B"),
        ("other", "env=other", "Client tags=env=other → fall back to formal"),
    ]

    save(
        draw_frame(
            [
                ("Real client OpenAPI pull (not Console admin API)", FG),
                ("", FG),
                (f"GET {CLIENT_BASE}/v1/GetConfigFile", CYAN),
                (f"  ?namespace={NS}&group={GROUP}&fileName={FILE}&version=0", DIM),
                ("  [&tags=env=gray-a|gray-b]", DIM),
                ("", FG),
                ("Same file, different client labels → different active releases", GREEN),
            ],
            "Lattice.Hub · Client config pull · multi-gray",
        ),
        "00-title.png",
        2.4,
        playlist,
    )

    for key, tags, caption in cases:
        resp = pull(tags)
        tag_arg = "" if not tags else f"&tags={tags}"
        lines: list[tuple[str, tuple[int, int, int]]] = [
            ("$ curl -sS \\", CYAN),
            (f"    '{CLIENT_BASE}/v1/GetConfigFile", CYAN),
            (f"      ?namespace={NS}&group={GROUP}", CYAN),
            (f"      &fileName={FILE}&version=0{tag_arg}'", CYAN),
            ("", FG),
            (caption, FG),
            ("", FG),
        ]
        lines.extend(fmt_resp(resp))
        save(draw_frame(lines, f"Client pull · {key}"), f"10-{key}.png", 3.0, playlist)

    # summary comparison
    rows = []
    for key, tags, _ in cases:
        resp = pull(tags)
        file = resp.get("file") or {}
        label = tags or "(none)"
        rows.append(
            (
                f"{label:<16} → {file.get('release_type'):<7}  {file.get('name')}  |  {(file.get('content') or '').strip().replace(chr(10), ' / ')}",
                GREEN if file.get("release_type") == "gray" else YELLOW,
            )
        )
    save(
        draw_frame(
            [
                ("Result matrix (live OpenAPI responses)", FG),
                ("", FG),
                ("tags             → type     release_name", DIM),
                *rows,
                ("", FG),
                ("Formal baseline stays active while multiple grays remain independently hittable.", CYAN),
            ],
            "Same file · four client identities · three release bodies",
        ),
        "20-summary.png",
        3.6,
        playlist,
    )

    list_path = OUT_DIR.parent / "gif-list.txt"
    with list_path.open("w") as fh:
        for path, seconds in playlist:
            fh.write(f"file '{path}'\n")
            fh.write(f"duration {seconds}\n")
        fh.write(f"file '{playlist[-1][0]}'\n")

    GIF_OUT.parent.mkdir(parents=True, exist_ok=True)
    subprocess.check_call(
        [
            "ffmpeg",
            "-y",
            "-f",
            "concat",
            "-safe",
            "0",
            "-i",
            str(list_path),
            "-vf",
            "fps=8,scale=1200:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=96:stats_mode=diff[p];[s1][p]paletteuse=dither=bayer:bayer_scale=3",
            "-loop",
            "0",
            str(GIF_OUT),
        ]
    )
    print(f"wrote {GIF_OUT}")


if __name__ == "__main__":
    main()
