import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { CheckCircle, Loader2, XCircle } from "lucide-react";

export default function PartnerPortalAcceptInvite() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'expired'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  const token = new URLSearchParams(window.location.search).get('token');

  const acceptInviteMutation = useMutation({
    mutationFn: async (token: string) => {
      return apiRequest('/api/partner-portal/accept-invite', {
        method: 'POST',
        body: JSON.stringify({ token })
      });
    },
    onSuccess: () => {
      setStatus('success');
      toast({ title: "Invitation accepted!" });
      setTimeout(() => {
        setLocation('/partner-portal');
      }, 2000);
    },
    onError: (error: any) => {
      const message = error?.message || 'Failed to accept invitation';
      if (message.includes('expired')) {
        setStatus('expired');
      } else {
        setStatus('error');
        setErrorMessage(message);
      }
    }
  });

  useEffect(() => {
    if (token) {
      acceptInviteMutation.mutate(token);
    } else {
      setStatus('error');
      setErrorMessage('No invitation token provided');
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Accept Invitation | ServiceTitan Hacks Partner Portal" 
        description="Accept your partner portal invitation" 
      />
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              {status === 'loading' && (
                <>
                  <Loader2 className="h-12 w-12 mx-auto text-primary animate-spin mb-4" />
                  <CardTitle>Accepting Invitation</CardTitle>
                  <CardDescription>Please wait while we process your invitation...</CardDescription>
                </>
              )}
              
              {status === 'success' && (
                <>
                  <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-4" />
                  <CardTitle>Welcome to the Partner Portal!</CardTitle>
                  <CardDescription>
                    Your invitation has been accepted. Redirecting you to the portal...
                  </CardDescription>
                </>
              )}
              
              {status === 'error' && (
                <>
                  <XCircle className="h-12 w-12 mx-auto text-destructive mb-4" />
                  <CardTitle>Unable to Accept Invitation</CardTitle>
                  <CardDescription>{errorMessage}</CardDescription>
                </>
              )}
              
              {status === 'expired' && (
                <>
                  <XCircle className="h-12 w-12 mx-auto text-destructive mb-4" />
                  <CardTitle>Invitation Expired</CardTitle>
                  <CardDescription>
                    This invitation link has expired. Please contact your administrator for a new invitation.
                  </CardDescription>
                </>
              )}
            </CardHeader>
            
            {(status === 'error' || status === 'expired') && (
              <CardContent className="text-center">
                <Button 
                  onClick={() => setLocation('/contact')}
                  data-testid="button-contact"
                >
                  Contact Support
                </Button>
              </CardContent>
            )}
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
