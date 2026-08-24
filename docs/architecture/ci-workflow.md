# CI workflow architecture

ThreatFade Web intentionally does not use npm dependency caching until a lockfile is committed. GitHub's `setup-node` npm cache is lockfile-dependent, while this repository currently installs from `package.json` with `npm install`.

CI, security, and CodeQL run on pull requests targeting `main`, pushes to `main`, and merge-queue `checks_requested` events. Manual dispatch remains available.

Required checks must report on merge groups as well as pull requests; GitHub documents `merge_group` as a separate event for merge-queue validation.

Once a committed lockfile becomes part of the repository's package-management contract, npm caching may be re-enabled after verifying `npm ci` reproducibility.
