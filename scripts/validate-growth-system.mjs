import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const errors = [];

const taxonomy = read("lib/analytics/taxonomy.ts");
const eventRegistry = read("docs/analytics/EVENT-TAXONOMY.md");
const reconciliation = read("docs/growth/GROWTH-SYSTEM-RECONCILIATION.md");

const eventBlock = taxonomy.match(/export const conversionEvents = \[(.*?)\] as const/s)?.[1] ?? "";
const codeEvents = [...eventBlock.matchAll(/"([a-z0-9_]+)"/g)].map((match) => match[1]);
const documentedEvents = [...eventRegistry.matchAll(/^\|\s*`([a-z0-9_]+)`\s*\|/gm)].map(
  (match) => match[1],
);

const unique = (items) => [...new Set(items)].sort();
const codeEventSet = unique(codeEvents);
const documentedEventSet = unique(documentedEvents);
const missingFromDocs = codeEventSet.filter((event) => !documentedEventSet.includes(event));
const undocumented = documentedEventSet.filter((event) => !codeEventSet.includes(event));

if (missingFromDocs.length || undocumented.length) {
  errors.push(
    `Canonical analytics event registry mismatch. Missing from docs: ${missingFromDocs.join(", ") || "none"}; undocumented events: ${undocumented.join(", ") || "none"}.`,
  );
}

const allowedStatuses = new Set([
  "IMPLEMENTED",
  "PARTIALLY_IMPLEMENTED",
  "MISSING",
  "BROKEN",
  "UNVERIFIED",
  "EXTERNAL_DEPENDENCY",
  "INTENTIONALLY_DEFERRED",
]);
const statusColumnValues = [
  ...reconciliation.matchAll(
    /^\|[^\n]*\|\s*(IMPLEMENTED|PARTIALLY_IMPLEMENTED|MISSING|BROKEN|UNVERIFIED|EXTERNAL_DEPENDENCY|INTENTIONALLY_DEFERRED)\s*\|/gm,
  ),
].map((match) => match[1]);
if (!statusColumnValues.length) {
  errors.push("Growth reconciliation contains no machine-readable status rows.");
}
for (const status of statusColumnValues) {
  if (!allowedStatuses.has(status)) errors.push(`Unsupported growth status: ${status}`);
}

for (const required of [
  "docs/growth/GROWTH-SYSTEM-RECONCILIATION.md",
  "docs/analytics/EVENT-TAXONOMY.md",
  "docs/growth/GROWTH-SYSTEM-FINAL-AUDIT.md",
]) {
  if (!fs.existsSync(path.join(root, required))) {
    if (required.endsWith("FINAL-AUDIT.md")) {
      console.warn(`Growth final audit not yet present: ${required}`);
    } else {
      errors.push(`Missing growth control document: ${required}`);
    }
  }
}

if (errors.length) {
  console.error("Growth system validation: FAIL");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Growth system validation: GREEN");
