#!/usr/bin/env python3
"""Run the managed image-generation script with a direct gateway connection."""
import os
import runpy
import sys

os.environ["NO_PROXY"] = "agent-gw.kimi.com,www.kimi.com,kimi.com"
os.environ["no_proxy"] = os.environ["NO_PROXY"]
SCRIPT = r"C:\Users\ADMIN\AppData\Roaming\kimi-desktop\daimon-share\daimon\runtime\kimi-code\home\plugins\managed\image_generation\scripts\image_generation_tool.py"
sys.argv = [SCRIPT, *sys.argv[1:]]
runpy.run_path(SCRIPT, run_name="__main__")
