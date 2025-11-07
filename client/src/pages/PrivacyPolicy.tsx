import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-24 bg-background">
          <div className="mx-auto max-w-4xl px-6">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground mb-12">
              <strong>Effective Date:</strong> 9/9/2025
            </p>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-lg mb-8">
                ServiceTitan Hacks ("we," "our," "us") respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains what information we collect, how we use it, and the choices you have.
              </p>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold font-heading mb-4">1. Information We Collect</h2>
                  <p className="mb-4">
                    We may collect the following types of information when you use our website, join our community, or interact with our services:
                  </p>
                  <ul className="space-y-2 list-disc pl-6">
                    <li><strong>Contact Information:</strong> name, email address, phone number.</li>
                    <li><strong>Business Information:</strong> company name, role, and industry.</li>
                    <li><strong>Payment Information:</strong> if you purchase products, courses, or sponsorships.</li>
                    <li><strong>Usage Information:</strong> how you interact with our website, emails, and content.</li>
                    <li><strong>Social Media/Community Data:</strong> if you join our Facebook group or other communities.</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold font-heading mb-4">2. How We Use Your Information</h2>
                  <p className="mb-4">We use your information to:</p>
                  <ul className="space-y-2 list-disc pl-6">
                    <li>Provide and improve our services, courses, and community.</li>
                    <li>Communicate with you about updates, resources, offers, and sponsorships.</li>
                    <li>Process payments and deliver products you purchase.</li>
                    <li>Analyze trends to improve user experience.</li>
                    <li>Protect against fraud, misuse, or unauthorized access.</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold font-heading mb-4">3. How We Share Information</h2>
                  <p className="mb-4">
                    We do <strong>not</strong> sell your personal information. We may share information only in these cases:
                  </p>
                  <ul className="space-y-2 list-disc pl-6">
                    <li><strong>With service providers</strong> who help us operate our website, email system, payment processor, or analytics tools.</li>
                    <li><strong>With sponsors or partners</strong> only if you explicitly opt in (for example, when requesting a demo through a sponsored post).</li>
                    <li><strong>As required by law</strong> to comply with legal obligations or protect our rights.</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold font-heading mb-4">4. Cookies and Tracking</h2>
                  <p>
                    We use cookies, pixels, and tracking tools (such as Meta Pixel and Google Analytics) to measure performance, run ads, and improve your experience. You can disable cookies in your browser settings.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold font-heading mb-4">5. Data Retention</h2>
                  <p>
                    We keep your personal data only as long as necessary to provide services, comply with legal obligations, or resolve disputes.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold font-heading mb-4">6. Your Choices</h2>
                  <p className="mb-4">You may:</p>
                  <ul className="space-y-2 list-disc pl-6">
                    <li>Opt out of marketing emails by clicking "unsubscribe."</li>
                    <li>Request access, correction, or deletion of your personal data.</li>
                    <li>Disable cookies through your browser.</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold font-heading mb-4">7. Security</h2>
                  <p>
                    We take reasonable steps to protect your information from unauthorized access or disclosure. However, no system is 100% secure.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold font-heading mb-4">8. Children's Privacy</h2>
                  <p>
                    Our services are not directed to children under 13. We do not knowingly collect data from children.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold font-heading mb-4">9. Changes to This Policy</h2>
                  <p>
                    We may update this Privacy Policy from time to time. Updates will be posted on this page with a revised effective date.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold font-heading mb-4">10. Contact Us</h2>
                  <p className="mb-4">
                    If you have any questions about this Privacy Policy, contact us at:
                  </p>
                  <p className="font-semibold">ServiceTitan Hacks</p>
                  <p>
                    Email: <a href="mailto:support@st-hacks.com" className="text-primary hover:underline">support@st-hacks.com</a>
                  </p>
                  <p>
                    Website: <a href="https://servicetitanhacks.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">servicetitanhacks.com</a>
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
