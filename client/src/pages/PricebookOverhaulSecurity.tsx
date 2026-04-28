import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { ArrowLeft } from "lucide-react";

export default function PricebookOverhaulSecurity() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-white">
      <SEO
        title="Pricebook Overhaul: Security and Privacy | ServiceTitan Hacks"
        description="How we protect your ServiceTitan pricebook during the overhaul process. Encryption, access controls, AI data policy, file retention, and NDA availability."
        canonicalUrl="https://servicetitanhacks.com/pricebook-overhaul/security"
        noindex={false}
      />
      <Header />
      <main className="flex-1">
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-2xl px-6">

            <h1 className="text-3xl md:text-4xl font-bold font-heading mb-6 text-white">
              Pricebook Overhaul: Security and Privacy
            </h1>
            <p className="text-[#a3a3a3] leading-relaxed mb-12">
              Your pricebook is one of the most sensitive assets in your business. Here is exactly how we handle it.
            </p>

            <div className="space-y-10">

              <div>
                <h2 className="text-xl font-semibold font-heading text-white mb-3">File storage</h2>
                <p className="text-[#a3a3a3] leading-relaxed">
                  Your Excel file is uploaded over an encrypted HTTPS connection and stored in Supabase, which encrypts all files at rest using AES-256. Files are stored under per-job paths and are not visible to other customers.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold font-heading text-white mb-3">Access</h2>
                <p className="text-[#a3a3a3] leading-relaxed">
                  Only the operator (Bill Brown) has admin access to customer files. Your pricebook is not shared with any third party, partner, or sponsor.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold font-heading text-white mb-3">What gets sent to AI</h2>
                <p className="text-[#a3a3a3] leading-relaxed">
                  Only the Description text and the Category name from each Service item are sent to OpenAI's API for rewriting. We never send your pricing, item codes, costs, margins, labor rates, or any other business data to any AI service.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold font-heading text-white mb-3">OpenAI's data policy</h2>
                <p className="text-[#a3a3a3] leading-relaxed">
                  Per OpenAI's API data usage policy (effective March 1, 2023), data submitted via the API is not used to train OpenAI models and is retained for a maximum of 30 days for abuse monitoring, then deleted.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold font-heading text-white mb-3">File retention</h2>
                <p className="text-[#a3a3a3] leading-relaxed">
                  We delete your original and overhauled files from our storage within 30 days of delivery. You can request immediate deletion at any time by replying to your confirmation email.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold font-heading text-white mb-3">NDA</h2>
                <p className="text-[#a3a3a3] leading-relaxed">
                  A mutual non-disclosure agreement is available on request before you upload your file. Just reply to your confirmation email or message us before purchase.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold font-heading text-white mb-3">Payment</h2>
                <p className="text-[#a3a3a3] leading-relaxed">
                  Payments are processed by Stripe. We never see or store your card details.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold font-heading text-white mb-3">Questions</h2>
                <p className="text-[#a3a3a3] leading-relaxed">
                  Email{" "}
                  <a
                    href="mailto:bill@servicetitanhacks.com"
                    className="text-white underline underline-offset-2 hover:text-[#a3a3a3] transition-colors"
                  >
                    bill@servicetitanhacks.com
                  </a>
                  .
                </p>
              </div>

            </div>

            <div className="mt-16 pt-8 border-t border-zinc-800">
              <Link href="/pricebook-overhaul">
                <span className="inline-flex items-center gap-2 text-sm text-[#a3a3a3] hover:text-white transition-colors cursor-pointer">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Pricebook Overhaul
                </span>
              </Link>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
