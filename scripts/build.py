#!/usr/bin/env python3
"""Bundle src/ into a single self-contained Holy Book Web HTML file.

Usage:
  python3 scripts/build.py                 # writes Holy_Book_Web.html
  python3 scripts/build.py --out file.html

How it works
------------
- Loads build/manifest.template.json (uuid -> {_name | _parts, mime, compressed}).
- For each entry reads bytes from src/<_name> (or concats src/<part> in the
  order declared by _parts), optionally gzip + base64.
- Loads build/template.html (the real document: head/CSS + #root + script srcs
  pointing at the manifest UUIDs), JSON-encodes it, and injects it into
  build/shell.html at __TEMPLATE__. __MANIFEST__ gets the asset JSON.
"""
from __future__ import annotations

import argparse
import base64
import gzip
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src"
BUILD = ROOT / "build"


def _read_bytes_for(entry: dict) -> bytes:
    if "_parts" in entry:
        return b"".join((SRC / part).read_bytes() for part in entry["_parts"])
    return (SRC / entry["_name"]).read_bytes()


def encode_template(template_html: str) -> str:
    """JSON-encode the document and neutralise </script> for the HTML parser.

    The template lives inside <script type="__bundler/template">…</script>. Any
    literal </script in the JSON string would close that tag early — even inside
    a quoted string. \\u003c keeps it inert for the tokenizer; JSON.parse decodes
    it back to '<' at runtime.
    """
    encoded = json.dumps(template_html)
    return re.sub(r"</script(\s*)>", r"\\u003c/script\1>", encoded, flags=re.IGNORECASE)


def build(out_path: Path) -> None:
    template_manifest = json.loads(
        (BUILD / "manifest.template.json").read_text(encoding="utf-8")
    )
    shell = (BUILD / "shell.html").read_text(encoding="utf-8")
    template_html = (BUILD / "template.html").read_text(encoding="utf-8")

    out_manifest: dict[str, dict] = {}
    for uuid, entry in template_manifest.items():
        raw = _read_bytes_for(entry)
        if entry.get("compressed"):
            payload = gzip.compress(raw, compresslevel=9, mtime=0)
        else:
            payload = raw
        out_manifest[uuid] = {
            "data": base64.b64encode(payload).decode("ascii"),
            "mime": entry["mime"],
            "compressed": bool(entry.get("compressed", False)),
        }

    manifest_json = json.dumps(out_manifest, separators=(",", ":"))
    out_html = shell.replace("__MANIFEST__", manifest_json)
    out_html = out_html.replace("__TEMPLATE__", encode_template(template_html))
    out_path.write_text(out_html, encoding="utf-8")
    sz = out_path.stat().st_size
    print(f"built: {out_path.name}  ({sz:,} bytes)")


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default="Holy_Book_Web.html")
    args = ap.parse_args()
    build(ROOT / args.out)


if __name__ == "__main__":
    main()
