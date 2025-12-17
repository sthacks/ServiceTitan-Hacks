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

// Campaign reporting types
export interface CampaignReport {
  id: string;
  campaignTitle: string;
  subject: string;
  sendTime: string;
  emailsSent: number;
  uniqueOpens: number;
  openRate: number;
  clicks: number;
  clickRate: number;
  unsubscribed: number;
  bounced: number;
}

export interface CampaignListResponse {
  campaigns: CampaignReport[];
  totalItems: number;
}

// Get recent campaigns with their reports
export async function getCampaignReports(options: {
  count?: number;
  sinceDate?: string;
  beforeDate?: string;
}): Promise<CampaignListResponse> {
  if (!isConfigured) {
    console.warn("[Mailchimp] Not configured, cannot fetch campaigns");
    return { campaigns: [], totalItems: 0 };
  }

  try {
    const params: any = {
      status: "sent",
      count: options.count || 10,
      sort_field: "send_time",
      sort_dir: "DESC",
    };

    if (options.sinceDate) {
      params.since_send_time = options.sinceDate;
    }
    if (options.beforeDate) {
      params.before_send_time = options.beforeDate;
    }

    const campaignsResponse = await (mailchimp.campaigns as any).list(params);
    
    const campaigns: CampaignReport[] = [];
    
    for (const campaign of campaignsResponse.campaigns || []) {
      try {
        const report = await (mailchimp.reports as any).getCampaignReport(campaign.id);
        
        campaigns.push({
          id: campaign.id,
          campaignTitle: campaign.settings?.title || 'Untitled',
          subject: campaign.settings?.subject_line || '',
          sendTime: campaign.send_time,
          emailsSent: report.emails_sent || 0,
          uniqueOpens: report.opens?.unique_opens || 0,
          openRate: report.opens?.open_rate || 0,
          clicks: report.clicks?.clicks_total || 0,
          clickRate: report.clicks?.click_rate || 0,
          unsubscribed: report.unsubscribed || 0,
          bounced: report.bounces?.hard_bounces || 0,
        });
      } catch (reportError) {
        console.error(`[Mailchimp] Failed to get report for campaign ${campaign.id}:`, reportError);
      }
    }

    return {
      campaigns,
      totalItems: campaignsResponse.total_items || campaigns.length,
    };
  } catch (error: any) {
    console.error("[Mailchimp] Error fetching campaigns:", error.response?.body || error.message);
    return { campaigns: [], totalItems: 0 };
  }
}

// Get aggregate stats for a date range
export async function getAggregateStats(options: {
  sinceDate?: string;
  beforeDate?: string;
}): Promise<{
  totalRecipients: number;
  totalSent: number;
  avgOpenRate: string;
  avgClickRate: string;
  totalClicks: number;
  totalOpens: number;
  campaignCount: number;
}> {
  const reports = await getCampaignReports({ 
    count: 100, 
    sinceDate: options.sinceDate,
    beforeDate: options.beforeDate 
  });
  
  if (reports.campaigns.length === 0) {
    return {
      totalRecipients: 0,
      totalSent: 0,
      avgOpenRate: "0%",
      avgClickRate: "0%",
      totalClicks: 0,
      totalOpens: 0,
      campaignCount: 0,
    };
  }

  const totals = reports.campaigns.reduce((acc, c) => ({
    sent: acc.sent + c.emailsSent,
    opens: acc.opens + c.uniqueOpens,
    clicks: acc.clicks + c.clicks,
    openRateSum: acc.openRateSum + c.openRate,
    clickRateSum: acc.clickRateSum + c.clickRate,
  }), { sent: 0, opens: 0, clicks: 0, openRateSum: 0, clickRateSum: 0 });

  const avgOpenRate = (totals.openRateSum / reports.campaigns.length * 100).toFixed(1);
  const avgClickRate = (totals.clickRateSum / reports.campaigns.length * 100).toFixed(1);

  return {
    totalRecipients: totals.sent,
    totalSent: totals.sent,
    avgOpenRate: `${avgOpenRate}%`,
    avgClickRate: `${avgClickRate}%`,
    totalClicks: totals.clicks,
    totalOpens: totals.opens,
    campaignCount: reports.campaigns.length,
  };
}

// Get list growth stats
export async function getListGrowth(): Promise<{
  memberCount: number;
  unsubscribeCount: number;
  cleanedCount: number;
  lastMonthGrowth: number;
}> {
  if (!isConfigured) {
    return { memberCount: 0, unsubscribeCount: 0, cleanedCount: 0, lastMonthGrowth: 0 };
  }

  try {
    const list = await (mailchimp.lists as any).getList(MAILCHIMP_LIST_ID);
    const stats = list.stats || {};

    return {
      memberCount: stats.member_count || 0,
      unsubscribeCount: stats.unsubscribe_count || 0,
      cleanedCount: stats.cleaned_count || 0,
      lastMonthGrowth: stats.member_count_since_send || 0,
    };
  } catch (error: any) {
    console.error("[Mailchimp] Error fetching list stats:", error.response?.body || error.message);
    return { memberCount: 0, unsubscribeCount: 0, cleanedCount: 0, lastMonthGrowth: 0 };
  }
}
