import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = { title: "Terms of Service | RentBuyStay" };

const sections = [
  { title: "1. Acceptance of Terms", body: "By accessing or using the RentBuyStay platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site." },
  { title: "2. Use of the Platform", body: "RentBuyStay provides a platform for property listings and connections between property owners, agents, and seekers. We do not act as a broker, agent, or party to any transaction. All transactions are solely between the relevant parties." },
  { title: "3. User Accounts", body: "You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorised use of your account. We reserve the right to terminate accounts that violate these terms." },
  { title: "4. Listings and Content", body: "All listings on the platform are provided by third-party agents and property owners. RentBuyStay does not guarantee the accuracy, completeness, or availability of any listing. We encourage users to verify all information independently before entering any transaction." },
  { title: "5. Payments", body: "Payments processed through the platform are handled by third-party payment providers. Please review their terms and fee structures. RentBuyStay is not liable for payment processing errors or disputes between users and payment providers." },
  { title: "6. Limitation of Liability", body: "To the maximum extent permitted by law, RentBuyStay shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of the platform or any transactions conducted through it." },
  { title: "7. Changes to Terms", body: "We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the platform. Continued use of the platform after any changes constitutes acceptance of the new terms." },
];

export default function TOSPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <section className="bg-[#121212] text-white py-16">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <h1 className="text-3xl lg:text-5xl font-semibold mb-2">Terms of Service</h1>
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
