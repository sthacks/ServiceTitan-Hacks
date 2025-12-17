import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Building2, Plus, Users, Mail, ArrowLeft, Loader2, Pencil } from "lucide-react";
import { format } from "date-fns";
import type { PartnerCompany, PartnerUser } from "@shared/schema";

interface PartnerMeResponse {
  isPartner: boolean;
  partnerUser?: PartnerUser;
  company?: PartnerCompany;
}

export default function PartnerPortalAdmin() {
  const { toast } = useToast();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [newCompany, setNewCompany] = useState({
    name: '',
    logoUrl: '',
    subscriptionTier: '',
    deliverables: '',
    notes: ''
  });
  const [inviteData, setInviteData] = useState({
    email: '',
    companyId: '',
    role: 'account_admin'
  });

  const { data: meData, isLoading: meLoading } = useQuery<PartnerMeResponse>({
    queryKey: ['/api/partner-portal/me'],
  });

  const { data: companies, isLoading: companiesLoading } = useQuery<PartnerCompany[]>({
    queryKey: ['/api/partner-portal/companies'],
    enabled: meData?.partnerUser?.role === 'master_admin',
  });

  const createCompanyMutation = useMutation({
    mutationFn: async (data: typeof newCompany) => {
      const deliverables = data.deliverables
        ? JSON.stringify(data.deliverables.split('\n').filter(d => d.trim()))
        : null;
      
      return apiRequest('/api/partner-portal/companies', {
        method: 'POST',
        body: JSON.stringify({
          name: data.name,
          logoUrl: data.logoUrl || null,
          subscriptionTier: data.subscriptionTier || null,
          deliverables,
          notes: data.notes || null
        })
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/partner-portal/companies'] });
      setIsCreateOpen(false);
      setNewCompany({ name: '', logoUrl: '', subscriptionTier: '', deliverables: '', notes: '' });
      toast({ title: "Company created successfully" });
    },
    onError: () => {
      toast({ title: "Failed to create company", variant: "destructive" });
    }
  });

  const sendInviteMutation = useMutation({
    mutationFn: async (data: typeof inviteData) => {
      return apiRequest('/api/partner-portal/invites', {
        method: 'POST',
        body: JSON.stringify(data)
      });
    },
    onSuccess: () => {
      setIsInviteOpen(false);
      setInviteData({ email: '', companyId: '', role: 'account_admin' });
      toast({ title: "Invitation sent successfully" });
    },
    onError: () => {
      toast({ title: "Failed to send invitation", variant: "destructive" });
    }
  });

  if (meLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!meData?.isPartner || meData?.partnerUser?.role !== 'master_admin') {
    return (
      <div className="min-h-screen bg-background">
        <SEO title="Partner Portal Admin | ServiceTitan Hacks" description="Admin dashboard" />
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4 font-heading">Access Denied</h1>
            <p className="text-muted-foreground mb-8">
              You need master admin access to view this page.
            </p>
            <Link href="/partner-portal">
              <Button data-testid="button-back">Back to Partner Portal</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Partner Portal Admin | ServiceTitan Hacks" 
        description="Manage partner companies and users" 
      />
      
      <div className="bg-gradient-to-b from-[#09090b] to-[#1a1b20] py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/partner-portal" className="text-gray-400 hover:text-white text-sm flex items-center gap-1 mb-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Portal
              </Link>
              <h1 className="text-2xl font-bold text-white font-heading">
                Master Admin Dashboard
              </h1>
              <p className="text-gray-400 text-sm">Manage all partner companies and users</p>
            </div>
            <div className="flex gap-3">
              <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" data-testid="button-invite-user">
                    <Mail className="h-4 w-4 mr-2" />
                    Invite User
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Invite User</DialogTitle>
                    <DialogDescription>
                      Send an invitation to join the partner portal.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="invite-email">Email</Label>
                      <Input
                        id="invite-email"
                        type="email"
                        placeholder="user@company.com"
                        value={inviteData.email}
                        onChange={(e) => setInviteData({ ...inviteData, email: e.target.value })}
                        data-testid="input-invite-email"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="invite-company">Company</Label>
                      <Select
                        value={inviteData.companyId}
                        onValueChange={(value) => setInviteData({ ...inviteData, companyId: value })}
                      >
                        <SelectTrigger data-testid="select-invite-company">
                          <SelectValue placeholder="Select a company" />
                        </SelectTrigger>
                        <SelectContent>
                          {companies?.map((company) => (
                            <SelectItem key={company.id} value={company.id}>
                              {company.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="invite-role">Role</Label>
                      <Select
                        value={inviteData.role}
                        onValueChange={(value) => setInviteData({ ...inviteData, role: value })}
                      >
                        <SelectTrigger data-testid="select-invite-role">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="account_admin">Account Admin</SelectItem>
                          <SelectItem value="user">User</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button 
                      onClick={() => sendInviteMutation.mutate(inviteData)}
                      disabled={sendInviteMutation.isPending || !inviteData.email || !inviteData.companyId}
                      data-testid="button-send-invite"
                    >
                      {sendInviteMutation.isPending ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Mail className="h-4 w-4 mr-2" />
                      )}
                      Send Invitation
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogTrigger asChild>
                  <Button data-testid="button-create-company">
                    <Plus className="h-4 w-4 mr-2" />
                    New Company
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Create Partner Company</DialogTitle>
                    <DialogDescription>
                      Add a new partner company to the portal.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="company-name">Company Name *</Label>
                      <Input
                        id="company-name"
                        placeholder="Company Name"
                        value={newCompany.name}
                        onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                        data-testid="input-company-name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="logo-url">Logo URL</Label>
                      <Input
                        id="logo-url"
                        placeholder="https://..."
                        value={newCompany.logoUrl}
                        onChange={(e) => setNewCompany({ ...newCompany, logoUrl: e.target.value })}
                        data-testid="input-logo-url"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tier">Subscription Tier</Label>
                      <Select
                        value={newCompany.subscriptionTier}
                        onValueChange={(value) => setNewCompany({ ...newCompany, subscriptionTier: value })}
                      >
                        <SelectTrigger data-testid="select-tier">
                          <SelectValue placeholder="Select tier" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Diamond">Diamond</SelectItem>
                          <SelectItem value="Elite">Elite</SelectItem>
                          <SelectItem value="Featured">Featured</SelectItem>
                          <SelectItem value="Standard">Standard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deliverables">Deliverables (one per line)</Label>
                      <Textarea
                        id="deliverables"
                        placeholder="Monthly email feature&#10;Social media posts&#10;Podcast mention"
                        value={newCompany.deliverables}
                        onChange={(e) => setNewCompany({ ...newCompany, deliverables: e.target.value })}
                        rows={4}
                        data-testid="textarea-deliverables"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea
                        id="notes"
                        placeholder="Internal notes about this partner..."
                        value={newCompany.notes}
                        onChange={(e) => setNewCompany({ ...newCompany, notes: e.target.value })}
                        rows={3}
                        data-testid="textarea-notes"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button 
                      onClick={() => createCompanyMutation.mutate(newCompany)}
                      disabled={createCompanyMutation.isPending || !newCompany.name}
                      data-testid="button-submit-company"
                    >
                      {createCompanyMutation.isPending ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Plus className="h-4 w-4 mr-2" />
                      )}
                      Create Company
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Partner Companies</h2>
          
          {companiesLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : companies && companies.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {companies.map((company) => (
                <Card key={company.id} className="hover-elevate cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        {company.logoUrl ? (
                          <img 
                            src={company.logoUrl} 
                            alt={company.name}
                            className="h-10 w-10 object-contain rounded"
                          />
                        ) : (
                          <div className="h-10 w-10 bg-muted rounded flex items-center justify-center">
                            <Building2 className="h-5 w-5 text-muted-foreground" />
                          </div>
                        )}
                        <div>
                          <CardTitle className="text-base" data-testid={`text-company-${company.id}`}>
                            {company.name}
                          </CardTitle>
                          {company.subscriptionTier && (
                            <Badge variant="secondary" className="text-xs mt-1">
                              {company.subscriptionTier}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        data-testid={`button-edit-${company.id}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground space-y-1">
                      {company.subscriptionStartDate && (
                        <p>Partner since {format(new Date(company.subscriptionStartDate), 'MMM yyyy')}</p>
                      )}
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Link href={`/partner-portal/admin/company/${company.id}`}>
                        <Button variant="outline" size="sm" data-testid={`button-manage-${company.id}`}>
                          Manage
                        </Button>
                      </Link>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setInviteData({ ...inviteData, companyId: company.id });
                          setIsInviteOpen(true);
                        }}
                        data-testid={`button-invite-to-${company.id}`}
                      >
                        <Users className="h-4 w-4 mr-1" />
                        Invite
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Partner Companies</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first partner company to get started.
                </p>
                <Button onClick={() => setIsCreateOpen(true)} data-testid="button-create-first">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Company
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
