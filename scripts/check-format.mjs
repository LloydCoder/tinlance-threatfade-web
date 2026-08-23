import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

function runGit(args) {
  return execFileSync("git", args, { encoding: "utf8" }).trim();
}

function changedFiles() {
  const eventPath = process.env.GITHUB_EVENT_PATH;
  if (!eventPath || !existsSync(eventPath)) return [];

  const event = JSON.parse(readFileSync(eventPath, "utf8"));
  let base;
  if (event.pull_request?.base?.sha) base = event.pull_request.base.sha;
  else if (event.merge_group?.base_sha) base = event.merge_group.base_sha;
  else if (event.before && /^[0-9a-f]{40}$/i.test(event.before)) base = event.before;

  if (!base) return [];

  return runGit(["diff", "--name-only", "--diff-filter=ACMR", base, "HEAD"])
    .split("\n")
    .filter(Boolean)
    .filter((file) => !file.startsWith("node_modules/") && !file.startsWith(".next/"));
}

const files = changedFiles();
const command = files.length ? ["--check", "--ignore-unknown", ...files] : ["--check", "--ignore-unknown", "."];

console.log(files.length ? `Checking ${files.length} changed file(s) with Prettier...` : "No GitHub event baseline found; checking the full repository with Prettier...");
execFileSync("npx", ["prettier", ...command], { stdio: "inherit" });
