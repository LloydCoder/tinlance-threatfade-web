# ThreatFade brand implementation

This repository is the public Next.js web platform. The detection engine remains in
[tinlance-threatfade](https://github.com/LloydCoder/tinlance-threatfade).

## Official identity

The owner-supplied ThreatFade logo kit v1.0 is authoritative. The site uses the Signal Trace mark
and official palette:

- Navy: `#0B1220`; raised Navy: `#16233B`
- Mist: `#E6EDF3`; Paper: `#F4F6F8`
- Signal Amber: `#F5A524` on dark and `#C27200` on light
- Slate: `#94A3B8` on dark and `#56657A` on light
- Inter for wordmark, headings and UI; JetBrains Mono for code and metrics

Never redraw, recolor, stretch, rotate, add effects to, or retype the outlined wordmark. Use the
provided mark/wordmark variants on their approved surfaces and preserve clear space.

## Implementation

- `public/brand/threatfade-mark-on-dark.svg`: exact supplied Signal Trace mark.
- `public/favicon.svg`, `public/icon.svg` and `public/safari-pinned-tab.svg`: exact supplied browser icons.
- `public/brand/brand.css` and `public/brand/colors.json`: canonical brand tokens.
- `app/globals.css` and `config/design-system.ts`: site design-system integration.
- `app/manifest.ts`: PWA theme and icon declarations.

GitHub repository social preview is a remote repository setting. Upload the supplied
`github-social-preview-dark-1280x640.png` under **Settings → General → Social preview** after
review; a tracked asset alone does not configure that setting.
