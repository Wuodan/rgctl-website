# Dead code detection — CLI demo
#
# Record: ./docs/videos/scripts/record-guide.sh dead-code-detection
# Burn:   ./docs/videos/scripts/burn-guide-captions.sh dead-code-detection
# Regen:  node docs/videos/scripts/gen-guide-tapes.mjs dead-code-detection

Output "docs/videos/guides/dead-code-detection-no-captions.gif"
Output "docs/videos/guides/dead-code-detection-no-captions.mp4"

Require rgctl
Require jq

Set Shell "bash"
Set FontSize 15
Set FontFamily "Menlo, Monaco, Consolas, monospace"
Set Width 1400
Set Height 800
Set Padding 16
Set Margin 20
Set MarginFill "#0d1117"
Set WindowBar Colorful
Set WindowBarSize 40
Set BorderRadius 8
Set Theme "Catppuccin Mocha"
Set TypingSpeed 18ms
Set Framerate 30
Set PlaybackSpeed 1.0
Set CursorBlink true

Hide
Type "cd docs/videos/.work/coolstore"
Enter
Sleep 300ms
Type "export PS1='\[\e[1;36m\]coolstore\[\e[0m\] \[\e[1;32m\]❯\[\e[0m\] '"
Enter
Sleep 100ms
Type "clear"
Enter
Show

# 1. Whole-graph reachability from every entry point
Type "# 1. Whole-graph reachability from every entry point"
Enter
Type "rgctl -f json dead-code | jq '.summary'"
Enter
Sleep 2.5s

Hide
Type "clear"
Enter
Show

# 2. Safe-delete queue — high-confidence roots only
Type "# 2. Safe-delete queue — high-confidence roots only"
Enter
Type `rgctl -f json dead-code --confidence high --limit 4 | jq '.findings | map({symbol_name, kind, loc: "\(.file_path):\(.start_line)"})'`
Enter
Sleep 3s

Hide
Type "clear"
Enter
Show

# 3. Teach it entry points — root a whole REST subtree
Type "# 3. Teach it entry points — root a whole REST subtree"
Enter
Type "rgctl -f json dead-code --entry-point rest | jq '.summary'"
Enter
Sleep 3s
