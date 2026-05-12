import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = { title: "Privacy Policy | RentBuyStay" };

const sections = [
  { title: "1. Information We Collect", body: "We collect information you provide directly to us, such as your name, email address, phone number, and any other details you submit through forms on the platform. We also collect usage data including pages visited, search queries, and device information." },
  { title: "2. How We Use Your Information", body: "We use your information to provide and improve our services, personalise your experience, communicate with you about listings and updates, and ensure the safety and security of the platform. We do not sell your personal data to third parties." },
  { title: "3. Information Sharing", body: "We may share your information with verified agents and property owners when you initiate contact through the platform. We may also share data with service providers who assist in our operations, subject to confidentiality agreements." },
  { title: "4. Cookies", body: "We use cookies and similar tracking technologies to enhance your experience, remember your preferences, and analyse platform usage. You can control cookie settings through your browser. Disabling cookies may affect some features of the platform." },
  { title: "5. Data Security", body: "We implement industry-standard security measures to protect your personal information. However, no method of transmission over the internet is 100% secure. We encourage you to use strong passwords and keep your account credentials confidential." },
  { title: "6. Your Rights", body: "You have the right to access, correct, or delete your personal data at any time. To exercise these rights, contact us at privacy@rentbuystay.com. We will respond to all requests within 30 days." },
  { title: "7. Changes to This Policy", body: "We may update this Privacy Policy from time to time. We will notify you of significant changes by email or through a prominent notice on the platform. Continued use of the platform after changes constitutes acceptance." },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <section className="bg-[#121212] text-white py-16">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <h1 className="text-3xl lg:text-5xl font-semibold mb-2">Privacy Policy</h1>
          <p className="text-[#7f7e7e] text-sm">Last updated: May 12, 2026</p>
        </div>
      </section>

      <section className="py-14 bg-[#f6f6f6] flex-1">
        <div className="max-w-3xl mx-auto px-6 lg:px-0">
          <div className="bg-white rounded-2xl p-8 flex flex-col gap-8">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="text-base font-semibold text-[#121212] mb-2">{s.title}</h2>
                <p className="text-sm text-[#7f7e7e] leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
