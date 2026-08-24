import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "README.md",
  "SECURITY.md",
  "CONTRIBUTING.md",
  "docs/architecture.md",
  "docs/engine-api-integration.md",
  "docs/PHASE-5-DOCUMENTATION.md",
  "docs/security/phase10-hardening.md",
  "docs/release/phase11-launch-gate.md",
];

const errors = [];
const warnings = [];

const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));

for (const file of requiredFiles) {
  if (!exists(file)) errors.push(`Missing required documentation: ${file}`);
}

const readme = exists("README.md") ? read("README.md") : "";
const architecture = exists("docs/architecture.md") ? read("docs/architecture.md") : "";
const phase5 = exists("docs/PHASE-5-DOCUMENTATION.md") ? read("docs/PHASE-5-DOCUMENTATION.md") : "";
const gate = exists("docs/release/phase11-launch-gate.md") ? read("docs/release/phase11-launch-gate.md") : "";
const gateText = gate.toLowerCase();

const engineUrl = "https://github.com/LloydCoder/tinlance-threatfade";
const webUrl = "https://github.com/LloydCoder/tinlance-threatfade-web";

for (const [name, content] of [
  ["README.md", readme],
  ["docs/architecture.md", architecture],
  ["docs/PHASE-5-DOCUMENTATION.md", phase5],
]) {
  if (!content.includes(engineUrl)) errors.push(`${name} must identify the engine repository as a source of truth.`);
  if (!content.includes(webUrl)) errors.push(`${name} must identify the web repository boundary.`);
}

if (!readme.includes("evidence-first")) errors.push("README.md is missing the evidence-first product boundary.");
if (!readme.includes("does not claim")) warnings.push("README.md should keep explicit non-claim language near assurance statements.");
if (!architecture.includes("engine repository remains the source of truth")) {
  errors.push("docs/architecture.md must state the engine repository source-of-truth boundary.");
}
if (!phase5.includes("current ThreatFade engine repository")) {
  errors.push("docs/PHASE-5-DOCUMENTATION.md must constrain public docs to the current engine repository.");
}

const mdxRoot = path.join(root, "content", "docs");
if (!fs.existsSync(mdxRoot)) {
  errors.push("Missing content/docs MDX documentation root.");
} else {
  const mdxFiles = fs.readdirSync(mdxRoot).filter((name) => name.endsWith(".mdx"));
  if (mdxFiles.length < 1) errors.push("No public MDX documentation pages found.");
  for (const name of mdxFiles) {
    const content = fs.readFileSync(path.join(mdxRoot, name), "utf8");
    if (!content.match(/^---\n[\s\S]*?title:\s*.+\n[\s\S]*?---/)) {
      errors.push(`Missing or malformed frontmatter in content/docs/${name}.`);
    }
  }
}

const phaseDir = path.join(root, "docs", "phases");
if (fs.existsSync(phaseDir)) {
  for (const name of fs.readdirSync(phaseDir).filter((file) => file.endsWith(".md"))) {
    const content = fs.readFileSync(path.join(phaseDir, name), "utf8");
    if (!/^#.*phase/i.test(content)) warnings.push(`Phase document ${name} has no obvious phase heading.`);
  }
}

if (!gateText.includes("manual assistive-technology verification")) {
  errors.push("Phase 11 gate must explicitly document the manual accessibility boundary.");
}
if (!gateText.includes("real-user core web vitals")) {
  errors.push("Phase 11 gate must explicitly document the field-performance boundary.");
}
if (gate.includes("[ ] Manual assistive-technology verification")) {
  errors.push("Phase 11 gate contains an unresolved accessibility checkbox; represent this as a documented release-owner boundary instead.");
}
if (gate.includes("[ ] Real-user Core Web Vitals")) {
  errors.push("Phase 11 gate contains an unresolved field-performance checkbox; represent this as a documented production-telemetry boundary instead.");
}

if (errors.length) {
  console.error("Documentation reconciliation: FAIL");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Documentation reconciliation: GREEN");
if (warnings.length) {
  console.log("Non-blocking observations:");
  for (const warning of warnings) console.log(`- ${warning}`);
}
