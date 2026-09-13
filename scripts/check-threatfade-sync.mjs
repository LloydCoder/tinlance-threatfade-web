import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const localPath = path.join(root, "content", "engine-truth.json");
const canonicalUrl =
  "https://raw.githubusercontent.com/LloydCoder/tinlance-threatfade/main/docs/public-truth.json";

const local = JSON.parse(await fs.readFile(localPath, "utf8"));
const response = await fetch(canonicalUrl, {
  headers: { accept: "application/json" },
});

if (!response.ok) {
  throw new Error(`Unable to fetch canonical ThreatFade truth manifest: HTTP ${response.status}`);
}

const canonical = await response.json();

const fields = [
  "schemaVersion",
  "product",
  "version",
  "status",
  "evidenceTaxonomy",
  "capabilities",
  "validation",
  "integrations",
  "security",
];

const drift = (field) => {
  throw new Error(`ThreatFade synchronization drift detected in field: ${field}`);
};

const assertCompatible = (localValue, canonicalValue, field) => {
  if (Array.isArray(localValue)) {
    if (!Array.isArray(canonicalValue) || localValue.length !== canonicalValue.length) {
      drift(field);
    }

    localValue.forEach((value, index) =>
      assertCompatible(value, canonicalValue[index], `${field}[${index}]`),
    );
    return;
  }

  if (localValue && typeof localValue === "object") {
    if (!canonicalValue || typeof canonicalValue !== "object" || Array.isArray(canonicalValue)) {
      drift(field);
    }

    for (const key of Object.keys(localValue)) {
      if (!(key in canonicalValue)) {
        drift(`${field}.${key}`);
      }
      assertCompatible(localValue[key], canonicalValue[key], `${field}.${key}`);
    }
    return;
  }

  if (localValue !== canonicalValue) {
    drift(field);
  }
};

for (const field of fields) {
  assertCompatible(local[field], canonical[field], field);
}

if (local.engineRepository !== "https://github.com/LloydCoder/tinlance-threatfade") {
  throw new Error("ThreatFade engine repository reference is invalid");
}

console.log(`ThreatFade truth synchronized: v${canonical.version}`);
