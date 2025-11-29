import mailchimp from "@mailchimp/mailchimp_marketing";
import crypto from "crypto";

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
const MAILCHIMP_SERVER = process.env.MAILCHIMP_SERVER_PREFIX;
const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;

let isConfigured = false;

function initMailchimp() {
  if (!MAILCHIMP_API_KEY || !MAILCHIMP_SERVER || !MAILCHIMP_LIST_ID) {
    console.warn("[Mailchimp] Missing configuration. Set MAILCHIMP_API_KEY, MAILCHIMP_SERVER_PREFIX, and MAILCHIMP_LIST_ID.");
    return false;
  }

  mailchimp.setConfig({
    apiKey: MAILCHIMP_API_KEY,
    server: MAILCHIMP_SERVER,
  });

  isConfigured = true;
  console.log("[Mailchimp] Configured successfully");
  return true;
}

initMailchimp();

interface SubscriberData {
  email: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  tags?: string[];
}

export async function addOrUpdateSubscriber(data: SubscriberData): Promise<{ success: boolean; message: string; isNew?: boolean }> {
  if (!isConfigured) {
    console.warn("[Mailchimp] Not configured, skipping subscriber sync");
    return { success: false, message: "Mailchimp not configured" };
  }

  try {
    const subscriberHash = crypto
      .createHash("md5")
      .update(data.email.toLowerCase())
      .digest("hex");

    const mergeFields: Record<string, string> = {};
    if (data.firstName) mergeFields.FNAME = data.firstName;
    if (data.lastName) mergeFields.LNAME = data.lastName;
    if (data.companyName) mergeFields.COMPANY = data.companyName;

    const response = await (mailchimp.lists as any).setListMember(
      MAILCHIMP_LIST_ID,
      subscriberHash,
      {
        email_address: data.email,
        status_if_new: "subscribed",
        merge_fields: mergeFields,
      }
    );

    const isNew = response.status === "subscribed" && !response.last_changed;
    console.log(`[Mailchimp] Subscriber ${isNew ? "added" : "updated"}: ${data.email}`);

    if (data.tags && data.tags.length > 0) {
      try {
        await (mailchimp.lists as any).updateListMemberTags(
          MAILCHIMP_LIST_ID,
          subscriberHash,
          {
            tags: data.tags.map(tag => ({ name: tag, status: "active" })),
          }
        );
        console.log(`[Mailchimp] Tags added for ${data.email}: ${data.tags.join(", ")}`);
      } catch (tagError) {
        console.error("[Mailchimp] Failed to add tags:", tagError);
      }
    }

    return { 
      success: true, 
      message: isNew ? "Subscriber added to Mailchimp" : "Subscriber updated in Mailchimp",
      isNew 
    };
  } catch (error: any) {
    console.error("[Mailchimp] Error adding/updating subscriber:", error.response?.body || error.message);
    return { 
      success: false, 
      message: error.response?.body?.detail || error.message || "Failed to sync with Mailchimp" 
    };
  }
}

export function isMailchimpConfigured(): boolean {
  return isConfigured;
}
