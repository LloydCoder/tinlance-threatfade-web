import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const localPath = path.join(root, "content", "engine-truth.json");
const canonicalUrl = "https://raw.githubusercontent.com/LloydCoder/tinlance-threatfade/main/docs/public-truth.json";

const local = JSON.parse(await fs.readFile(localPath, "utf8"));
const response = await fetch(canonicalUrl, { headers: { accept: "application/json" } });
if (!response.ok) {
  throw new Error(`Unable to fetch canonical ThreatFade truth manifest: HTTP ${response.status}`);
}
const canonical = await response.json();

const fields = ["schemaVersion", "product", "version", "status", "evidenceTaxonomy", "capabilities", "validation", "integrations", "security"];
const comparable = (value) => JSON.stringify(value, Object.keys(value).sort());
for (const field of fields) {
  if (comparable(local[field]) !== comparable(canonical[field])) {
    throw new Error(`ThreatFade synchronization drift detected in field: ${field}`);
  }
}

if (local.engineRepository !== "https://github.com/LloydCoder/tinlance-threatfade") {
  throw new Error("ThreatFade engine repository reference is invalid");
}

console.log(`ThreatFade truth synchronized: v${canonical.version}`);
