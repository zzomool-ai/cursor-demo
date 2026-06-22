#!/usr/bin/env bash
set -euo pipefail

input=$(cat)
script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
log_dir="${script_dir}/logs"
log_file="${log_dir}/audit.log"

mkdir -p "$log_dir"
printf '%s %s\n' "$(date -u +"%Y-%m-%dT%H:%M:%SZ")" "$input" >> "$log_file"

if command -v jq >/dev/null 2>&1 && echo "$input" | jq -e '.command' >/dev/null 2>&1; then
  echo '{ "permission": "allow" }'
elif echo "$input" | grep -qE '"command"[[:space:]]*:'; then
  echo '{ "permission": "allow" }'
fi

exit 0