import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { FileText } from "lucide-react";

export default function SMSTermsConditions() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="SMS Terms and Conditions - ServiceTitan Hacks"
        description="Read the terms and conditions for ServiceTitan Hacks SMS messaging services, including user agreement, message frequency, opt-out procedures, and service limitations."
        canonicalUrl="https://servicetitanhacks.com/sms-terms-conditions"
        keywords="SMS terms and conditions, text message terms, SMS agreement, TCPA compliance, message service terms"
      />
      <Header />

      <div className="bg-gradient-to-br from-red-900 to-black py-20 text-white">
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex items-center gap-4 mb-6">
            <FileText className="h-12 w-12 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold" data-testid="text-page-title">
              SMS Terms and Conditions
            </h1>
          </div>
          <p className="text-xl text-gray-300" data-testid="text-effective-date">
            Effective Date: June 25, 2026
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4" data-testid="heading-agreement">1. Agreement to Terms</h2>
            <p className="text-foreground leading-relaxed mb-4">
              By opting in to receive SMS text messages from ST Hacks LLC, doing business as ServiceTitan Hacks ("we," "us," "ST Hacks"), you agree to these SMS Terms and Conditions. If you do not agree to these terms, do not opt in to our SMS program.
            </p>
            <p className="text-foreground leading-relaxed">
              These terms supplement our{" "}
              <a href="/privacy-policy" className="text-primary hover:underline" data-testid="link-privacy-policy">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="/sms-privacy-policy" className="text-primary hover:underline" data-testid="link-sms-privacy-policy">
                SMS Privacy Policy
              </a>
              .
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4" data-testid="heading-service-description">2. Service Description</h2>
            <p className="text-foreground leading-relaxed mb-4">
              Our SMS program provides subscribers with:
            </p>
            <ul className="list-disc pl-6 text-foreground leading-relaxed space-y-2">
              <li>Marketing messages about our products, services, courses, and special offers</li>
              <li>Updates and announcements related to ServiceTitan tools and integrations</li>
              <li>Educational content and tips for home service contractors</li>
              <li>Event notifications and community updates</li>
              <li>Customer support and service-related communications</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4" data-testid="heading-consent">3. User Consent</h2>
            <p className="text-foreground leading-relaxed mb-4">
              By opting in, you provide your prior express written consent to receive marketing and promotional text messages from ServiceTitan Hacks using an automatic telephone dialing system. Consent is not a condition of purchase.
            </p>
            <p className="text-foreground leading-relaxed">
              You certify that you are the authorized user of the mobile phone number you provide or have the authority to provide consent on behalf of the account holder.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4" data-testid="heading-message-frequency">4. Message Frequency</h2>
            <p className="text-foreground leading-relaxed">
              Message frequency varies depending on the program and your preferences. You may receive up to 10 messages per month. During promotional periods or special events, message frequency may increase.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4" data-testid="heading-cost">5. Cost and Data Rates</h2>
            <p className="text-foreground leading-relaxed mb-4">
              <strong>Message and data rates may apply.</strong> ServiceTitan Hacks does not charge for SMS messages, but your mobile carrier's standard messaging and data rates apply. Check with your carrier for details about your specific plan.
            </p>
            <p className="text-foreground leading-relaxed">
              We are not responsible for any charges you may incur from your mobile carrier for receiving text messages.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4" data-testid="heading-opt-out">6. How to Opt Out</h2>
            <p className="text-foreground leading-relaxed mb-4">
              You may opt out of receiving SMS messages at any time by:
            </p>
            <ul className="list-disc pl-6 text-foreground leading-relaxed space-y-2">
              <li>
                Replying <strong>STOP</strong>, <strong>CANCEL</strong>, <strong>UNSUBSCRIBE</strong>, <strong>END</strong>, or <strong>QUIT</strong> to any message from our SMS number{" "}
                <a href="tel:+19412227386" className="text-primary hover:underline" data-testid="link-sms-number">
                  (941) 222-7386
                </a>
              </li>
              <li>
                Contacting us at{" "}
                <a href="mailto:support@st-hacks.com" className="text-primary hover:underline" data-testid="link-support-email">
                  support@st-hacks.com
                </a>
              </li>
            </ul>
            <p className="text-foreground leading-relaxed mt-4">
              After you opt out, you will receive one final confirmation message. You will not receive any further messages unless you opt in again.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4" data-testid="heading-help">7. Help and Support</h2>
            <p className="text-foreground leading-relaxed">
              For help or assistance with our SMS program, reply <strong>HELP</strong> to any message or contact us at{" "}
              <a href="mailto:support@st-hacks.com" className="text-primary hover:underline" data-testid="link-help-email">
                support@st-hacks.com
              </a>
              . We will respond as soon as possible.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4" data-testid="heading-supported-carriers">8. Supported Carriers</h2>
            <p className="text-foreground leading-relaxed mb-4">
              Our SMS program is available on participating carriers including AT&T, T-Mobile, Verizon, Boost, Cricket, MetroPCS, U.S. Cellular, and others.
            </p>
            <p className="text-foreground leading-relaxed">
              Service may not be available on all carriers. We are not responsible for delayed or undelivered messages due to carrier network issues.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4" data-testid="heading-user-obligations">9. User Obligations and Prohibited Conduct</h2>
            <p className="text-foreground leading-relaxed mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 text-foreground leading-relaxed space-y-2">
              <li>Provide false, inaccurate, or misleading information when opting in</li>
              <li>Use the SMS service for any unlawful purpose</li>
              <li>Attempt to interfere with or disrupt the SMS service</li>
              <li>Use automated means to interact with our SMS system</li>
              <li>Share or forward messages in a way that violates our intellectual property rights</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4" data-testid="heading-service-modifications">10. Service Modifications and Termination</h2>
            <p className="text-foreground leading-relaxed mb-4">
              We reserve the right to:
            </p>
            <ul className="list-disc pl-6 text-foreground leading-relaxed space-y-2">
              <li>Modify, suspend, or discontinue the SMS service at any time without notice</li>
              <li>Change message frequency, content, or features</li>
              <li>Terminate your access to the SMS service if you violate these terms</li>
              <li>Update these terms and conditions with notice to subscribers</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4" data-testid="heading-disclaimer">11. Disclaimer of Warranties</h2>
            <p className="text-foreground leading-relaxed mb-4">
              THE SMS SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
            </p>
            <p className="text-foreground leading-relaxed">
              We do not guarantee that:
            </p>
            <ul className="list-disc pl-6 text-foreground leading-relaxed space-y-2 mt-4">
              <li>Messages will be delivered in a timely manner or at all</li>
              <li>The service will be uninterrupted or error-free</li>
              <li>The content will be accurate, complete, or up-to-date</li>
              <li>The service will be compatible with all carriers or devices</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4" data-testid="heading-limitation-liability">12. Limitation of Liability</h2>
            <p className="text-foreground leading-relaxed mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, ST HACKS LLC SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES RESULTING FROM:
            </p>
            <ul className="list-disc pl-6 text-foreground leading-relaxed space-y-2">
              <li>Your use or inability to use the SMS service</li>
              <li>Unauthorized access to or alteration of your data or communications</li>
              <li>Delays, errors, or interruptions in message delivery</li>
              <li>Charges from your mobile carrier</li>
              <li>Any other matter relating to the SMS service</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4" data-testid="heading-indemnification">13. Indemnification</h2>
            <p className="text-foreground leading-relaxed">
              You agree to indemnify, defend, and hold harmless ST Hacks LLC, its affiliates, and their respective officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including reasonable attorneys' fees) arising out of or related to your use of the SMS service or violation of these terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4" data-testid="heading-governing-law">14. Governing Law and Disputes</h2>
            <p className="text-foreground leading-relaxed mb-4">
              These terms shall be governed by and construed in accordance with the laws of the United States and applicable state laws, without regard to conflict of law principles.
            </p>
            <p className="text-foreground leading-relaxed">
              Any disputes arising from these terms or the SMS service shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association, except where prohibited by law.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4" data-testid="heading-changes">15. Changes to These Terms</h2>
            <p className="text-foreground leading-relaxed">
              We may update these SMS Terms and Conditions from time to time. If we make material changes, we will notify you via SMS or email. Your continued use of the SMS service after changes are posted constitutes your acceptance of the updated terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4" data-testid="heading-severability">16. Severability</h2>
            <p className="text-foreground leading-relaxed">
              If any provision of these terms is found to be invalid or unenforceable, the remaining provisions will continue in full force and effect.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4" data-testid="heading-contact">17. Contact Information</h2>
            <p className="text-foreground leading-relaxed mb-4">
              For questions, support, or to exercise your rights regarding our SMS service:
            </p>
            <p className="text-foreground leading-relaxed">
              <strong>ST Hacks LLC</strong><br />
              Email:{" "}
              <a href="mailto:support@st-hacks.com" className="text-primary hover:underline" data-testid="link-contact-email">
                support@st-hacks.com
              </a><br />
              SMS Number:{" "}
              <a href="tel:+19412227386" className="text-primary hover:underline" data-testid="link-contact-sms">
                (941) 222-7386
              </a><br />
              Website:{" "}
              <a href="https://servicetitanhacks.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer" data-testid="link-website">
                servicetitanhacks.com
              </a>
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
