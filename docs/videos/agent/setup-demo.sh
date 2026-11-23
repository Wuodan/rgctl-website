#!/usr/bin/env bash
#
# Prepare a fixture for an agent-video take.
#
#   ./docs/videos/agent/setup-demo.sh --agent cursor
#   ./docs/videos/agent/setup-demo.sh --agent claude --skip-index
#
# Environment overrides:
#   FIXTURE      example/coolstore-weblogic
#   RGCTL_REPO   ../rbuilder
#   RGCTL_BIN    rgctl (or an explicit path)
#   AGENT_TOOLS  cursor
#   INDEX_ARGS   "-l java --with-git"
#   SKIP_INDEX   0

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WEBSITE_ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"

RGCTL_REPO="${RGCTL_REPO:-$WEBSITE_ROOT/../rbuilder}"
FIXTURE="${FIXTURE:-example/coolstore-weblogic}"
AGENT_TOOLS="${AGENT_TOOLS:-cursor}"
INDEX_ARGS="${INDEX_ARGS:--l java --with-git}"
SKIP_INDEX="${SKIP_INDEX:-0}"
FORCE=0

usage() {
  cat <<'USAGE'
Usage: setup-demo.sh [options]

  --agent IDS     Comma-separated agent pack ids (default: cursor)
  --fixture PATH  Fixture relative to RGCTL_REPO or absolute
  --repo PATH     Product checkout (default: sibling ../rbuilder)
  --skip-index    Install the pack but do not run discover
  --force         Pass --force to rgctl install (overwrite changed pack files)
  -h, --help      Show this help

Examples:
  ./docs/videos/agent/setup-demo.sh --agent cursor
  ./docs/videos/agent/setup-demo.sh --agent claude --skip-index
  FIXTURE=example/k8s-website INDEX_ARGS= ./docs/videos/agent/setup-demo.sh --agent cursor
USAGE
}

while [ $# -gt 0 ]; do
  case "$1" in
    --agent) AGENT_TOOLS="${2:?missing value for --agent}"; shift 2 ;;
    --fixture) FIXTURE="${2:?missing value for --fixture}"; shift 2 ;;
    --repo) RGCTL_REPO="${2:?missing value for --repo}"; shift 2 ;;
    --skip-index) SKIP_INDEX=1; shift ;;
    --force) FORCE=1; shift ;;
    -h|--help) usage; exit 0 ;;
    *) echo "unknown option: $1" >&2; usage >&2; exit 2 ;;
  esac
done

if [ ! -d "$RGCTL_REPO" ]; then
  echo "Product checkout not found: $RGCTL_REPO" >&2
  echo "Set RGCTL_REPO=/path/to/rbuilder or pass --repo." >&2
  exit 1
fi
RGCTL_REPO="$(cd "$RGCTL_REPO" && pwd)"

case "$FIXTURE" in
  /*) FIXTURE_DIR="$FIXTURE" ;;
  *) FIXTURE_DIR="$RGCTL_REPO/$FIXTURE" ;;
esac
if [ ! -d "$FIXTURE_DIR" ]; then
  echo "Fixture not found: $FIXTURE_DIR" >&2
  echo "Fetch it with the product repo's scripts/fetch-profile-repos.sh, or pass --fixture." >&2
  exit 1
fi
FIXTURE_DIR="$(cd "$FIXTURE_DIR" && pwd)"

if [ -z "${RGCTL_BIN:-}" ]; then
  if command -v rgctl >/dev/null 2>&1; then
    RGCTL_BIN="$(command -v rgctl)"
  elif [ -x "$RGCTL_REPO/target/release/rgctl" ]; then
    RGCTL_BIN="$RGCTL_REPO/target/release/rgctl"
  else
    echo "rgctl not found. Build it with:" >&2
    echo "  cargo build --release --bin rgctl --manifest-path \"$RGCTL_REPO/Cargo.toml\"" >&2
    echo "or set RGCTL_BIN=/path/to/rgctl." >&2
    exit 1
  fi
fi

if ! command -v git >/dev/null 2>&1; then
  echo "git is required to record fixture versions." >&2
  exit 1
fi

echo "Fixture:    $FIXTURE_DIR"
echo "Product:    $RGCTL_REPO"
echo "rgctl:      $RGCTL_BIN"
echo "Agent pack: $AGENT_TOOLS"
echo "Fixture SHA: $(git -C "$FIXTURE_DIR" rev-parse --short HEAD 2>/dev/null || echo 'not a git checkout')"
"$RGCTL_BIN" --version

INSTALL_ARGS=(install --skill --tools "$AGENT_TOOLS")
if [ "$FORCE" = "1" ]; then
  INSTALL_ARGS+=(--force)
fi
"$RGCTL_BIN" -r "$FIXTURE_DIR" "${INSTALL_ARGS[@]}"

if [ "$SKIP_INDEX" != "1" ]; then
  echo
  echo "Indexing with discover $INDEX_ARGS"
  # INDEX_ARGS is intentionally word-split so callers can pass several flags.
  # shellcheck disable=SC2086
  "$RGCTL_BIN" -r "$FIXTURE_DIR" discover . $INDEX_ARGS
fi

if [ "$SKIP_INDEX" != "1" ]; then
  echo
  "$RGCTL_BIN" -r "$FIXTURE_DIR" status
else
  echo
  echo "Skipping status because --skip-index was used."
fi

cat <<EOF

Ready.
  Fixture:     $FIXTURE_DIR
  Open it in:  $AGENT_TOOLS
  Script:      docs/videos/agent/scripts/<guide-slug>.md
  Config:      docs/videos/agent/config/README.md
  Record:      docs/videos/agent/RECORDING.md

For a temporal guide (ci-policy-checks, pr-review), prepare the base snapshot
described in that guide before starting the take.

EOF
