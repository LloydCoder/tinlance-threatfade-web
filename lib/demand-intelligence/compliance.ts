export type ContactClass = "corporate" | "sole_trader" | "unknown";

export type OutreachDecision = {
  allowed: boolean;
  reasons: string[];
  requiredActions: string[];
};

export function evaluateOutreach(input: {
  contactClass: ContactClass;
  hasConsent: boolean;
  hasExistingCustomerRelationship: boolean;
  lawfulBasisDocumented: boolean;
  suppressionListed: boolean;
  identityAndAddressConfigured: boolean;
}) : OutreachDecision {
  const reasons: string[] = [];
  const requiredActions: string[] = [];

  if (input.suppressionListed) {
    return { allowed: false, reasons: ["Contact is suppressed or has opted out."], requiredActions: [] };
  }

  if (!input.identityAndAddressConfigured) {
    return { allowed: false, reasons: ["Sender identity and a valid opt-out/contact address are not configured."], requiredActions: ["Configure sender identity and unsubscribe/contact address."] };
  }

  if (input.contactClass === "unknown") {
    reasons.push("Subscriber class is unknown; do not automate electronic outreach until jurisdiction and subscriber status are established.");
    requiredActions.push("Classify the recipient as corporate, sole trader, or individual and document the applicable rule.");
  }

  if (input.contactClass === "sole_trader" && !input.hasConsent && !input.hasExistingCustomerRelationship) {
    reasons.push("Sole-trader electronic marketing requires an appropriate consent or applicable existing-customer basis.");
    requiredActions.push("Obtain consent or establish a documented lawful basis and applicable marketing exception before sending.");
  }

  if (!input.lawfulBasisDocumented) {
    reasons.push("The processing lawful basis has not been documented.");
    requiredActions.push("Complete and retain a jurisdiction-appropriate lawful-basis assessment.");
  }

  if (reasons.length) return { allowed: false, reasons, requiredActions };
  return { allowed: true, reasons: ["No repository-level compliance blocker detected; jurisdiction-specific review still applies."], requiredActions: ["Include clear sender identity and an easy opt-out in every commercial message."] };
}
