import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, BarChart3, Image, FileText, Users, Mail, Youtube, Facebook, Link2, TrendingUp, Loader2 } from "lucide-react";
import { format } from "date-fns";
import type { PartnerCompany, PartnerUser, PartnerCampaignMetric, PartnerContentCalendarItem, PartnerBrandAsset } from "@shared/schema";

interface PartnerMeResponse {
  isPartner: boolean;
  partnerUser?: PartnerUser;
  company?: PartnerCompany;
}

export default function PartnerPortal() {
  const { data: meData, isLoading: meLoading } = useQuery<PartnerMeResponse>({
    queryKey: ['/api/partner-portal/me'],
  });

  const { data: metrics } = useQuery<PartnerCampaignMetric[]>({
    queryKey: ['/api/partner-portal/metrics'],
    enabled: !!meData?.isPartner && !!meData?.company,
  });

  const { data: calendar } = useQuery<PartnerContentCalendarItem[]>({
    queryKey: ['/api/partner-portal/calendar'],
    enabled: !!meData?.isPartner && !!meData?.company,
  });

  const { data: brandAssets } = useQuery<PartnerBrandAsset[]>({
    queryKey: ['/api/partner-portal/brand-assets'],
    enabled: !!meData?.isPartner && !!meData?.company,
  });

  if (meLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!meData?.isPartner) {
    return (
      <div className="min-h-screen bg-background">
        <SEO title="Partner Portal | ServiceTitan Hacks" description="Access your partner dashboard" />
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4 font-heading">Partner Portal</h1>
            <p className="text-muted-foreground mb-8">
              This portal is for ServiceTitan Hacks partners only. If you've been invited, 
              please check your email for the invitation link.
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                data-testid="button-login"
                onClick={() => window.location.href = "/api/login"}
              >
                Sign In
              </Button>
              <Link href="/contact">
                <Button variant="outline" data-testid="button-contact">Contact Us</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const company = meData.company;
  const partnerUser = meData.partnerUser;
  const latestMetric = metrics?.[0];

  const contentTypeIcons: Record<string, JSX.Element> = {
    email: <Mail className="h-4 w-4" />,
    social: <Facebook className="h-4 w-4" />,
    podcast: <FileText className="h-4 w-4" />,
    video: <Youtube className="h-4 w-4" />,
    ad: <TrendingUp className="h-4 w-4" />,
  };

  const deliverables = company?.deliverables ? JSON.parse(company.deliverables) : [];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={`${company?.name || 'Partner'} Portal | ServiceTitan Hacks`} 
        description="Access your partner dashboard and campaign performance" 
      />
      
      <div className="bg-gradient-to-b from-[#09090b] to-[#1a1b20] py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              {company?.logoUrl && (
                <img 
                  src={company.logoUrl} 
                  alt={company.name} 
                  className="h-12 w-auto object-contain"
                  data-testid="img-partner-logo"
                />
              )}
              <div className="text-white">
                <h1 className="text-2xl font-bold font-heading" data-testid="text-company-name">
                  {company?.name || 'Partner Portal'}
                </h1>
                <p className="text-gray-400 text-sm">ServiceTitan Hacks Partner Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {company?.subscriptionTier && (
                <Badge variant="secondary" className="text-sm" data-testid="badge-tier">
                  {company.subscriptionTier} Partner
                </Badge>
              )}
              {partnerUser?.role === 'master_admin' && (
                <Link href="/partner-portal/admin">
                  <Button variant="outline" size="sm" data-testid="button-admin">
                    Admin Dashboard
                  </Button>
                </Link>
              )}
              {partnerUser?.role === 'account_admin' && (
                <Link href="/partner-portal/manage">
                  <Button variant="outline" size="sm" data-testid="button-manage">
                    Manage Team
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="performance" data-testid="tab-performance">
              <BarChart3 className="h-4 w-4 mr-2" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="calendar" data-testid="tab-calendar">
              <Calendar className="h-4 w-4 mr-2" />
              Content Calendar
            </TabsTrigger>
            <TabsTrigger value="subscription" data-testid="tab-subscription">
              <FileText className="h-4 w-4 mr-2" />
              Subscription
            </TabsTrigger>
            <TabsTrigger value="brand-kit" data-testid="tab-brand-kit">
              <Image className="h-4 w-4 mr-2" />
              Brand Kit
            </TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            {latestMetric ? (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Campaign Performance</h2>
                  <Badge variant="outline">{latestMetric.reportPeriod}</Badge>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Email Campaign</CardTitle>
                      <Mail className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Recipients</span>
                          <span className="font-medium">{latestMetric.emailRecipients?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Open Rate</span>
                          <span className="font-medium">{latestMetric.emailOpenRate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Click Rate</span>
                          <span className="font-medium">{latestMetric.emailClickRate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Total Clicks</span>
                          <span className="font-medium">{latestMetric.emailTotalClicks?.toLocaleString()}</span>
                        </div>
                      </div>
                      {latestMetric.emailNotes && (
                        <p className="mt-3 text-xs text-muted-foreground">{latestMetric.emailNotes}</p>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Facebook Posts</CardTitle>
                      <Facebook className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Reach</span>
                          <span className="font-medium">{latestMetric.fbPostReach?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Engagement</span>
                          <span className="font-medium">{latestMetric.fbPostEngagement?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Video Views</span>
                          <span className="font-medium">{latestMetric.fbVideoViews?.toLocaleString()}</span>
                        </div>
                      </div>
                      {latestMetric.fbNotes && (
                        <p className="mt-3 text-xs text-muted-foreground">{latestMetric.fbNotes}</p>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">YouTube</CardTitle>
                      <Youtube className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Views</span>
                          <span className="font-medium">{latestMetric.ytViews?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Avg Duration</span>
                          <span className="font-medium">{latestMetric.ytAvgDuration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Retention</span>
                          <span className="font-medium">{latestMetric.ytRetention}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">New Subscribers</span>
                          <span className="font-medium">+{latestMetric.ytSubscribers}</span>
                        </div>
                      </div>
                      {latestMetric.ytNotes && (
                        <p className="mt-3 text-xs text-muted-foreground">{latestMetric.ytNotes}</p>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Facebook Ads</CardTitle>
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Reach</span>
                          <span className="font-medium">{latestMetric.fbAdReach?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Impressions</span>
                          <span className="font-medium">{latestMetric.fbAdImpressions?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Clicks</span>
                          <span className="font-medium">{latestMetric.fbAdClicks?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">CTR</span>
                          <span className="font-medium">{latestMetric.fbAdCtr}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">CPC</span>
                          <span className="font-medium">{latestMetric.fbAdCpc}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Spend</span>
                          <span className="font-medium">{latestMetric.fbAdSpend}</span>
                        </div>
                      </div>
                      {latestMetric.fbAdNotes && (
                        <p className="mt-3 text-xs text-muted-foreground">{latestMetric.fbAdNotes}</p>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Link Engagement</CardTitle>
                      <Link2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Total Clicks</span>
                          <span className="font-medium">{latestMetric.linkTotalClicks?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Unique Users</span>
                          <span className="font-medium">{latestMetric.linkUniqueUsers?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Referrers</span>
                          <span className="font-medium">{latestMetric.linkReferrers?.toLocaleString()}</span>
                        </div>
                      </div>
                      {latestMetric.linkNotes && (
                        <p className="mt-3 text-xs text-muted-foreground">{latestMetric.linkNotes}</p>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Funnel Overview</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Group Members</span>
                          <span className="font-medium">{latestMetric.funnelGroupMembers?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Posts</span>
                          <span className="font-medium">{latestMetric.funnelPosts?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Comments</span>
                          <span className="font-medium">{latestMetric.funnelComments?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Reactions</span>
                          <span className="font-medium">{latestMetric.funnelReactions?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Active Members</span>
                          <span className="font-medium">{latestMetric.funnelActiveMembers?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Landing Page Visits</span>
                          <span className="font-medium">{latestMetric.funnelLandingPageVisits?.toLocaleString()}</span>
                        </div>
                      </div>
                      {latestMetric.funnelNotes && (
                        <p className="mt-3 text-xs text-muted-foreground">{latestMetric.funnelNotes}</p>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Performance Data Yet</h3>
                  <p className="text-muted-foreground">
                    Campaign performance metrics will appear here after your first report.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <h2 className="text-xl font-semibold">Content Calendar</h2>
            
            {calendar && calendar.length > 0 ? (
              <div className="space-y-4">
                {calendar.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="py-4">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-16 text-center">
                          <div className="text-2xl font-bold">
                            {format(new Date(item.scheduledDate), 'd')}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {format(new Date(item.scheduledDate), 'MMM')}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {contentTypeIcons[item.contentType] || <FileText className="h-4 w-4" />}
                            <Badge variant="outline" className="text-xs capitalize">
                              {item.contentType}
                            </Badge>
                            <Badge 
                              variant={item.status === 'published' ? 'default' : 'secondary'}
                              className="text-xs capitalize"
                            >
                              {item.status}
                            </Badge>
                          </div>
                          <h3 className="font-medium">{item.title}</h3>
                          {item.description && (
                            <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Scheduled Content</h3>
                  <p className="text-muted-foreground">
                    Your content calendar will appear here once items are scheduled.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="subscription" className="space-y-6">
            <h2 className="text-xl font-semibold">Subscription Details</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Partnership Tier</CardTitle>
                  <CardDescription>Your current partnership level</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary mb-2">
                    {company?.subscriptionTier || 'Standard'}
                  </div>
                  {company?.subscriptionStartDate && (
                    <p className="text-sm text-muted-foreground">
                      Partner since {format(new Date(company.subscriptionStartDate), 'MMMM d, yyyy')}
                    </p>
                  )}
                  {company?.subscriptionEndDate && (
                    <p className="text-sm text-muted-foreground">
                      Renews {format(new Date(company.subscriptionEndDate), 'MMMM d, yyyy')}
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Deliverables</CardTitle>
                  <CardDescription>What's included in your partnership</CardDescription>
                </CardHeader>
                <CardContent>
                  {deliverables.length > 0 ? (
                    <ul className="space-y-2">
                      {deliverables.map((item: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground text-sm">
                      Contact your account manager for deliverables information.
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            {company?.notes && (
              <Card>
                <CardHeader>
                  <CardTitle>Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm whitespace-pre-wrap">{company.notes}</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="brand-kit" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Brand Kit</h2>
              {(partnerUser?.role === 'account_admin' || partnerUser?.role === 'master_admin') && (
                <Button variant="outline" size="sm" data-testid="button-upload-asset">
                  <Image className="h-4 w-4 mr-2" />
                  Upload Asset
                </Button>
              )}
            </div>
            
            {brandAssets && brandAssets.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {brandAssets.map((asset) => (
                  <Card key={asset.id}>
                    <CardContent className="p-4">
                      <div className="aspect-video bg-muted rounded-md mb-3 flex items-center justify-center overflow-hidden">
                        {asset.fileUrl.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i) ? (
                          <img 
                            src={asset.fileUrl} 
                            alt={asset.fileName}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <FileText className="h-12 w-12 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm truncate">{asset.fileName}</p>
                          <Badge variant="outline" className="text-xs capitalize mt-1">
                            {asset.assetType}
                          </Badge>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <a href={asset.fileUrl} download data-testid={`button-download-${asset.id}`}>
                            Download
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Image className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Brand Assets</h3>
                  <p className="text-muted-foreground">
                    Upload your logos and brand assets to keep everything in one place.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
