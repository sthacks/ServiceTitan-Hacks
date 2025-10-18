import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import titleBg from "@assets/Title (33)_1760815147781.png";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative py-24 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${titleBg})` }}
          />
          <div className="mx-auto max-w-7xl px-6 relative z-10">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-white">
                  Contact Us
                </h1>
                <p className="text-xl text-gray-300">
                  Have a question, partnership inquiry, or custom project in mind? We're here to help.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl mx-auto">

              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
