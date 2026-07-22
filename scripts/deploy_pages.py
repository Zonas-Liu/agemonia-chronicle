#!/usr/bin/env python3
"""Deploy website/dist to GitHub Pages via the Contents API.

Used because direct git push to github.com is blocked on this network,
while api.github.com is reachable. Reads GH_TOKEN from the environment.
"""
import base64
import json
import os
import sys
import time
import urllib.request
import urllib.error

REPO = "Zonas-Liu/agemonia-chronicle"
API = f"https://api.github.com/repos/{REPO}"
BRANCH = "gh-pages"
DIST = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "dist")

TOKEN = os.environ.get("GH_TOKEN")
if not TOKEN:
    sys.exit("GH_TOKEN not set")


def req(method, url, payload=None):
    data = json.dumps(payload).encode() if payload is not None else None
    r = urllib.request.Request(url, data=data, method=method)
    r.add_header("Authorization", f"token {TOKEN}")
    r.add_header("Accept", "application/vnd.github+json")
    r.add_header("User-Agent", "agemonia-deploy")
    for attempt in range(3):
        try:
            with urllib.request.urlopen(r, timeout=60) as resp:
                body = resp.read()
                return resp.status, json.loads(body) if body else {}
        except urllib.error.HTTPError as e:
            detail = e.read().decode(errors="replace")[:300]
            if e.code in (403, 429, 500, 502, 503) and attempt < 2:
                time.sleep(3)
                continue
            raise RuntimeError(f"{method} {url} -> {e.code}: {detail}")
        except OSError:
            if attempt < 2:
                time.sleep(3)
                continue
            raise


def upload(path, branch, message):
    with open(path, "rb") as f:
        content = base64.b64encode(f.read()).decode()
    rel = os.path.relpath(path, DIST).replace(os.sep, "/")
    payload = {"message": message, "content": content, "branch": branch}
    # If file already exists on the branch, its sha is required for update.
    try:
        status, existing = req("GET", f"{API}/contents/{rel}?ref={branch}")
        if status == 200 and isinstance(existing, dict) and "sha" in existing:
            payload["sha"] = existing["sha"]
    except RuntimeError as e:
        if "-> 404" not in str(e):
            raise
    req("PUT", f"{API}/contents/{rel}", payload)
    print(f"  uploaded {rel}")


def main():
    dist = os.path.normpath(DIST)
    files = []
    for root, _dirs, names in os.walk(dist):
        for n in names:
            files.append(os.path.join(root, n))
    files.sort(key=lambda p: (os.path.basename(p) != "index.html", p))
    print(f"{len(files)} files to deploy from {dist}")

    # Ensure default branch exists: upload index.html first (no branch => default).
    index_html = os.path.join(dist, "index.html")
    try:
        req("GET", f"{API}/git/refs/heads/main")
        default_branch_exists = True
    except RuntimeError:
        default_branch_exists = False

    if not default_branch_exists:
        print("initializing default branch with index.html ...")
        with open(index_html, "rb") as f:
            content = base64.b64encode(f.read()).decode()
        req("PUT", f"{API}/contents/index.html",
            {"message": "init", "content": content})

    # Create gh-pages ref if missing.
    try:
        req("GET", f"{API}/git/refs/heads/{BRANCH}")
        print(f"branch {BRANCH} exists")
    except RuntimeError:
        _s, ref = req("GET", f"{API}/git/refs/heads/main")
        sha = ref["object"]["sha"]
        req("POST", f"{API}/git/refs", {"ref": f"refs/heads/{BRANCH}", "sha": sha})
        print(f"created branch {BRANCH} at {sha[:8]}")

    for path in files:
        upload(path, BRANCH, "deploy site")

    print("all files deployed")


if __name__ == "__main__":
    main()
