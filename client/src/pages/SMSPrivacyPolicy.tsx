import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Phone } from "lucide-react";

export default function SMSPrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="SMS Privacy Policy - ServiceTitan Hacks"
        description="Learn how ServiceTitan Hacks collects, uses, and protects your mobile phone number and SMS message content when you opt in to receive text messages from us."
        canonicalUrl="https://servicetitanhacks.com/sms-privacy-policy"
        keywords="SMS privacy policy, text message privacy, TCPA compliance, SMS opt-out, data protection"
      />
      <Header />

      <div className="bg-gradient-to-br from-red-900 to-black py-20 text-white">
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex items-center gap-4 mb-6">
            <Phone className="h-12 w-12 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold" data-testid="text-page-title">
              SMS Privacy Policy
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
            <h2 className="text-2xl font-bold mb-4" data-testid="heading-scope">Scope</h2>
            <p className="text-foreground leading-relaxed mb-6">
              This policy explains how ST Hacks LLC, doing business as ServiceTitan Hacks ("we," "us," "ST Hacks"), collects, uses, stores, shares, and protects mobile phone numbers and SMS message content when you opt in to receive text messages from us.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4" data-testid="heading-what-we-collect">1. What We Collect</h2>
            <ul className="list-disc pl-6 text-foreground leading-relaxed space-y-2">
              <li>The phone number you provide to opt in to SMS.</li>
              <li>Message content you send to us (for support, replies, or opt-out).</li>
              <li>Metadata such as timestamps, delivery status, and carrier routing information.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4" data-testid="heading-how-we-use">2. How We Use Your Information</h2>
            <p className="text-foreground leading-relaxed mb-4">
              We use your phone number and message data to:
            </p>
            <ul className="list-disc pl-6 text-foreground leading-relaxed space-y-2">
              <li>Send the SMS messages you agreed to receive, including marketing, updates, reminders, and support replies.</li>
              <li>Manage and log opt-ins and opt-outs.</li>
              <li>Improve our services and detect abuse or fraud.</li>
            </ul>
            <p className="text-foreground leading-relaxed mt-4">
              We do not use SMS data for unrelated profiling without explicit notice and consent.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4" data-testid="heading-consent">3. Consent and Legal Basis</h2>
            <ul className="list-disc pl-6 text-foreground leading-relaxed space-y-2">
              <li>You must provide explicit consent to receive marketing SMS from us.</li>
              <li>For U.S. residents, we comply with the Telephone Consumer Protection Act (TCPA), which requires prior express written consent before sending promotional texts.</li>
              <li>For users under the GDPR (European Union), consent is required to be freely given, specific, informed, and unambiguous.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4" data-testid="heading-message-frequency">4. Message Frequency and Carrier Fees</h2>
            <p className="text-foreground leading-relaxed">
              Message frequency varies by program. Standard message and data rates from your carrier may apply.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4" data-testid="heading-opt-in-out">5. How to Opt In and Opt Out</h2>
            <ul className="list-disc pl-6 text-foreground leading-relaxed space-y-3">
              <li>
                <strong>Opt In:</strong> Provide your phone number and consent via our forms or text keyword signup.
              </li>
              <li>
                <strong>Opt Out:</strong> Reply <strong>STOP</strong> to any text message. You will receive one final confirmation message, and no further messages will be sent. You can also contact us at{" "}
                <a href="mailto:support@st-hacks.com" className="text-primary hover:underline" data-testid="link-support-email">
                  support@st-hacks.com
                </a>{" "}
                to unsubscribe.
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4" data-testid="heading-third-parties">6. Third Parties and Service Providers</h2>
            <p className="text-foreground leading-relaxed mb-4">
              We share your phone number and message data only with service providers that help us deliver our own messages, for example SMS gateway vendors. These providers are contractually limited to using your data solely to deliver our messages and may not use it for their own purposes.
            </p>
            <p className="text-foreground leading-relaxed">
              <strong>SMS Number:</strong>{" "}
              <a href="tel:+19412227386" className="text-primary hover:underline" data-testid="link-sms-number">
                (941) 222-7386
              </a>
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4" data-testid="heading-data-retention">7. Data Retention</h2>
            <p className="text-foreground leading-relaxed">
              We retain SMS consent records, opt-in confirmations, and message logs for as long as legally required or necessary to defend against claims under the TCPA or similar laws.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4" data-testid="heading-security">8. Security</h2>
            <p className="text-foreground leading-relaxed">
              We implement administrative, technical, and physical safeguards to protect your data. If a data breach occurs, we will follow applicable notification laws.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4" data-testid="heading-sharing">9. Sharing, Sale, and Marketing</h2>
            <p className="text-foreground leading-relaxed">
              We do not sell or rent your phone number or SMS opt-in information. We do not share your mobile opt-in information or SMS consent with any third parties or affiliates for their own marketing or promotional purposes.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4" data-testid="heading-children">10. Children</h2>
            <p className="text-foreground leading-relaxed">
              We do not knowingly collect or target SMS communications to children under 13.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4" data-testid="heading-your-rights">11. Your Rights</h2>
            <ul className="list-disc pl-6 text-foreground leading-relaxed space-y-2">
              <li>
                <strong>California residents:</strong> You may request access to, deletion of, or details about personal information we collect, consistent with the California Consumer Privacy Act (CCPA).
              </li>
              <li>
                <strong>EU/EEA residents:</strong> You may request access, correction, deletion, or portability of your data, or withdraw consent under the GDPR.
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4" data-testid="heading-updates">12. Updates to This Policy</h2>
            <p className="text-foreground leading-relaxed">
              We may revise this policy periodically. Updates will be posted with a new effective date.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4" data-testid="heading-contact">13. Contact</h2>
            <p className="text-foreground leading-relaxed">
              Questions or requests:{" "}
              <a href="mailto:support@st-hacks.com" className="text-primary hover:underline" data-testid="link-contact-email">
                support@st-hacks.com
              </a>
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
