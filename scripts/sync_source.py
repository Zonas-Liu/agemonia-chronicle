"""把 website 源码同步到 GitHub 仓库 main 分支（走 api.github.com，git push 被网络拦截时的替代方案）。

用法: GH_TOKEN=<token> python scripts/sync_source.py
通过 Git Data API 一次提交整个源码树：blobs -> tree -> commit -> 更新 refs/heads/main
"""
import base64
import json
import os
import sys
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

REPO = "Zonas-Liu/agemonia-chronicle"
BRANCH = "main"
ROOT = Path(__file__).resolve().parent.parent
EXCLUDE_DIRS = {"node_modules", "dist", ".git", ".bin"}
EXCLUDE_FILES = {".DS_Store"}


def api(method: str, path: str, token: str, payload: dict | None = None):
    req = urllib.request.Request(
        f"https://api.github.com{path}",
        method=method,
        headers={
            "Authorization": f"Bearer {token}",
            "Accept": "application/vnd.github+json",
            "User-Agent": "agemonia-sync",
            "X-GitHub-Api-Version": "2022-11-28",
        },
        data=json.dumps(payload).encode() if payload is not None else None,
    )
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.loads(r.read() or b"{}")


def main() -> None:
    token = os.environ.get("GH_TOKEN")
    if not token:
        sys.exit("GH_TOKEN 未设置")

    files = []
    for p in sorted(ROOT.rglob("*")):
        if not p.is_file():
            continue
        rel = p.relative_to(ROOT)
        if any(part in EXCLUDE_DIRS for part in rel.parts):
            continue
        if p.name in EXCLUDE_FILES:
            continue
        files.append(rel)

    print(f"collect {len(files)} files")

    # 1) 并发上传 blobs（失败的收集后重试一轮）
    def upload(rel: Path) -> dict:
        data = (ROOT / rel).read_bytes()
        blob = api("POST", f"/repos/{REPO}/git/blobs", token, {
            "content": base64.b64encode(data).decode(),
            "encoding": "base64",
        })
        print(f"  blob {rel.as_posix()}", flush=True)
        return {
            "path": rel.as_posix(),
            "mode": "100644",
            "type": "blob",
            "sha": blob["sha"],
        }

    tree_items = []
    failed: list[Path] = []
    with ThreadPoolExecutor(max_workers=8) as pool:
        futs = {pool.submit(upload, rel): rel for rel in files}
        for fut, rel in futs.items():
            try:
                tree_items.append(fut.result())
            except Exception as e:  # noqa: BLE001
                print(f"  FAIL {rel.as_posix()}: {e}", flush=True)
                failed.append(rel)
    for rel in failed:  # 串行重试一轮
        tree_items.append(upload(rel))

    # 2) 基于当前 main 分支创建 tree + commit
    ref = api("GET", f"/repos/{REPO}/git/refs/heads/{BRANCH}", token)
    base_commit = ref["object"]["sha"]
    base = api("GET", f"/repos/{REPO}/git/commits/{base_commit}", token)

    tree = api("POST", f"/repos/{REPO}/git/trees", token, {
        "base_tree": base["tree"]["sha"],
        "tree": tree_items,
    })
    commit = api("POST", f"/repos/{REPO}/git/commits", token, {
        "message": "sync: 网站源码（啊对对队 · 阿格莫尼亚编年史）",
        "tree": tree["sha"],
        "parents": [base_commit],
    })
    api("PATCH", f"/repos/{REPO}/git/refs/heads/{BRANCH}", token, {
        "sha": commit["sha"],
        "force": False,
    })
    print(f"done: {commit['sha'][:7]} -> {BRANCH}")


if __name__ == "__main__":
    main()
