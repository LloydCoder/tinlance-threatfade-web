# Configuration reference

This reference separates web-application environment variables from engine configuration. The two processes have different trust boundaries and must not share secrets through browser-visible configuration.

## Web application

The following server-side variables are documented by the web application. A variable marked optional is only needed when the corresponding integration is enabled.

| Variable | Required | Default / behavior | Exposure |
|---|---|---|---|
| `THREATFADE_API_URL` | For engine integration | No public production endpoint is assumed; configure the intended engine API origin | Server only |
| `THREATFADE_API_TIMEOUT_MS` | No | Client-defined default; inspect `lib/api/client.ts` before overriding | Server only |
| `THREATFADE_API_MAX_RETRIES` | No | Client-defined default; retries are bounded by the API client | Server only |

The exact runtime defaults are defined in `lib/api/client.ts`. Do not copy guessed numeric defaults into deployment configuration.

Authentication, OIDC and analytics providers have additional optional variables. Their authoritative declarations are the `.env.example` file and the relevant server-side integration modules. Review those sources before configuring an integration.

## Engine configuration

The engine runs separately. The following variables are documented by the engine's configuration guide and must be configured in the engine deployment, not exposed to the browser:

| Variable | Purpose | Notes |
|---|---|---|
| `THREATFADE_OIDC_ISSUER` | OIDC issuer | Required for the documented production OIDC boundary |
| `THREATFADE_OIDC_AUDIENCE` | Expected token audience | Must match the API resource registration |
| `THREATFADE_OIDC_JWKS_URL` | Optional JWKS endpoint | Issuer discovery is used when omitted, per engine documentation |
| `THREATFADE_ALLOWED_ORIGINS` | Browser origin allowlist | Configure exact production origins |

Engine roles documented in the engine configuration guide include `viewer`, `analyst`, `api_only`, `admin` and `tenant_admin`. The engine remains authoritative for role enforcement and tenant derivation.

## Security requirements

- Never prefix server secrets with `NEXT_PUBLIC_`.
- Never trust a browser-supplied tenant ID as an authorization decision.
- Do not commit production credentials or populate examples with real secrets.
- Use an approved secret manager for production values.
- Production engine URLs must use HTTPS.
- Keep web and engine environment variables in their respective deployment environments.

## Source locations

- [Web example environment](../../.env.example)
- [Web API client](../../lib/api/client.ts)
- [Web site configuration](../../config/site.ts)
- [Engine configuration guide](https://github.com/LloydCoder/tinlance-threatfade/blob/main/docs/CONFIGURATION.md)
- [Engine repository](https://github.com/LloydCoder/tinlance-threatfade)
