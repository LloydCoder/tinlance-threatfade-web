# Conversion events

The website exposes a small, privacy-respecting conversion taxonomy for enterprise evaluation journeys.

| Event                | Meaning                                            |
| -------------------- | -------------------------------------------------- |
| `run_playground`     | Visitor starts the curated playground journey.     |
| `view_github`        | Visitor chooses the open-source engine repository. |
| `read_docs`          | Visitor enters technical documentation.            |
| `explore_research`   | Visitor enters research content.                   |
| `request_evaluation` | Visitor starts an evaluation email action.         |
| `contact_threatfade` | Visitor starts a general contact action.           |

The website does not collect a lead database by default. Events are emitted as a browser `CustomEvent` and, when an existing analytics data layer is present, as a non-PII data-layer event. No email address, message body, telemetry payload or detection data is included in the event.

This keeps the site instrumentation provider-neutral and avoids adding an analytics dependency solely for a small CTA taxonomy. A production analytics provider can subscribe to `threatfade:conversion` or the data layer without changing the conversion semantics.
