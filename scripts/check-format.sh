#!/usr/bin/env bash
set -euo pipefail

event_path="${GITHUB_EVENT_PATH:-}"
files=()

if [[ -n "$event_path" && -f "$event_path" ]]; then
  base_sha="$(node --input-type=module -e '
    import fs from "node:fs";
    const event = JSON.parse(fs.readFileSync(process.argv[1], "utf8"));
    const base = event.pull_request?.base?.sha ?? event.merge_group?.base_sha ?? event.before;
    process.stdout.write(base ?? "");
  ' "$event_path")"

  if [[ "$base_sha" =~ ^[0-9a-fA-F]{40}$ ]]; then
    if ! git cat-file -e "$base_sha^{commit}" 2>/dev/null; then
      git fetch --no-tags --depth=1 origin "$base_sha" >/dev/null 2>&1 || true
    fi
    if git cat-file -e "$base_sha^{commit}" 2>/dev/null; then
      mapfile -t files < <(git diff --name-only --diff-filter=ACMR "$base_sha" HEAD)
    fi
  fi
fi

# PR merge refs can be shallow and omit the event baseline object. If it is
# still unavailable, compare against the first parent when that parent exists.
if ((${#files[@]} == 0)) && git rev-parse --verify HEAD^ >/dev/null 2>&1; then
  mapfile -t files < <(git diff --name-only --diff-filter=ACMR HEAD^ HEAD)
fi

if ((${#files[@]})); then
  filtered=()
  for file in "${files[@]}"; do
    [[ "$file" == node_modules/* || "$file" == .next/* ]] && continue
    filtered+=("$file")
  done
  files=("${filtered[@]}")
fi

if ((${#files[@]})); then
  echo "Checking ${#files[@]} changed file(s) with Prettier..."
  npx prettier --check --ignore-unknown "${files[@]}"
else
  echo "No changed-file baseline found; checking the full repository with Prettier..."
  npx prettier --check --ignore-unknown .
fi
