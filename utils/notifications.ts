import { getCurrentStrataPlan } from "../data/strataPlans/getStrataPlanByDomain";
import { mustGetCurrentStrata } from "../data/stratas/getStrataByDomain";
import { sendEmail } from "./sendEmail";

interface NotificationOptions {
  to: string | string[];
  subject: string;
  html: string;
  /** If true, also send to the strata's global inbox email (if configured) */
  ccStrataInbox?: boolean;
}

export async function sendNotification({
  to,
  subject,
  html,
  ccStrataInbox = false,
}: NotificationOptions) {
  const [strata, plan] = await Promise.all([
    mustGetCurrentStrata(),
    getCurrentStrataPlan(),
  ]);

  if (!plan.enableEmailNotifications) {
    return;
  }

  const recipients = typeof to === "string" ? [to] : [...to];

  if (ccStrataInbox && strata.inboxEmail) {
    recipients.push(strata.inboxEmail);
  }

  // Deduplicate
  const unique = [...new Set(recipients)].filter(Boolean);

  if (unique.length === 0) {
    return;
  }

  return sendEmail(unique, `[${strata.name}] ${subject}`, html);
}
