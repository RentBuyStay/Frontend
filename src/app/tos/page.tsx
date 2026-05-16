import LegalPage from "@/components/LegalPage";

export const metadata = {
  title: "Terms of Service | RentBuyStay",
  description: "Terms of Service governing use of the RentBuyStay platform.",
};

// Body text pulled verbatim from Figma node 268:39295. Numbered headings (e.g. "1. ") render as SemiBold 20/64.
const body = `1. Introduction and Acceptance
Welcome to RentBuyStay, a property marketplace platform operated by RentBuyStay (('we,' 'us,' or 'our')) and accessible at www.rentbuystay.com. By accessing or using our platform, you agree to be bound by these Terms of Service ('Terms'). Please read them carefully before using our services.
If you do not agree to these Terms, you must not use the RentBuyStay platform. We reserve the right to update these Terms at any time, and continued use of the platform after such changes constitutes your acceptance of the revised Terms.
2. Eligibility
To use RentBuyStay, you must:
• Be at least 18 years of age.
• Have the legal capacity to enter into a binding contract under Nigerian law.
• Not be prohibited from using the platform under any applicable law or regulation.
By registering, you confirm that all information you provide is accurate, complete, and current.
3. User Categories and Accounts
RentBuyStay serves four categories of users:
• Tenants and Renters: Individuals seeking residential or commercial property to rent.
• Property Buyers: Individuals seeking to purchase property.
• Property Owners and Landlords: Individuals or entities listing properties for rent or sale. Subscription fees apply for listing and premium features.
• Real Estate Agents: Licensed or practicing agents who list and manage properties on behalf of clients. Subscription fees apply.
You are responsible for maintaining the confidentiality of your account credentials. You must notify us immediately at support@rentbuystay.com if you suspect unauthorised access to your account.
4. Platform Use and Prohibited Conduct
You agree to use RentBuyStay only for lawful purposes and in accordance with these Terms. You must not:
• Post false, misleading, or fraudulent property listings.
• Impersonate any individual or entity or misrepresent your affiliation with any person or organisation.
• Use the platform to harass, threaten, or harm other users.
• Attempt to gain unauthorised access to any part of the platform or its systems.
• Use automated tools, bots, or scrapers to extract data from the platform without prior written consent.
• Engage in any activity that violates applicable Nigerian law, including the Cybercrimes (Prohibition, Prevention, etc.) Act 2015.
We reserve the right to suspend or permanently terminate accounts found in violation of these prohibitions.
5. Property Listings
Landlords, property owners, and real estate agents are solely responsible for the accuracy, legality, and completeness of their listings. RentBuyStay does not verify, endorse, or guarantee any listing, property condition, title, or transaction.
By submitting a listing, you confirm that:
• You are the legal owner or duly authorised representative of the property.
• The property is legally available for rent or sale.
• All information provided is accurate and not misleading.
RentBuyStay reserves the right to remove any listing at its sole discretion without prior notice.
6. Transactions and Disputes
RentBuyStay is a marketplace platform and is not a party to any transaction, lease agreement, sale, or contract between users. All agreements are solely between the relevant parties. We strongly recommend that users conduct independent due diligence, including physical inspection of properties and verification of ownership documents, before entering into any transaction. RentBuyStay bears no liability for any loss arising from transactions conducted through the platform.
7. Intellectual Property
All content on the RentBuyStay platform, including but not limited to logos, designs, text, graphics, and software, is the property of RentBuyStay or its licensors and is protected under applicable intellectual property laws. Users retain ownership of content they submit, but grant RentBuyStay a non-exclusive, royalty-free,
worldwide licence to use, display, and distribute such content for the purpose of operating and promoting the platform.
8. Limitation of Liability
To the maximum extent permitted by law, RentBuyStay, its directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of theplatform, including but not limited to loss of data, loss of income, or property-related losses. Our total aggregate liability to any user for any claim arising from these Terms shall not exceed the total subscription fees paid by that user in the three months preceding the claim.
9. Governing Law and Dispute Resolution
These Terms are governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any dispute arising out of or in connection with these Terms shall first be resolved through good-faith negotiation. If unresolved within 30 days, disputes shall be submitted to arbitration in Lagos, Nigeria, in accordance with the Arbitration and Conciliation Act.
10. Contact
For questions about these Terms, contact us at: legal@rentbuystay.com`;

export default function TOSPage() {
  return <LegalPage title="Terms of Service" body={body} />;
}
