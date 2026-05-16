import LegalPage from "@/components/LegalPage";

export const metadata = {
  title: "Privacy Policy | RentBuyStay",
  description: "How RentBuyStay collects, uses, and protects your personal data.",
};

// Body text pulled verbatim from Figma node 268:39618 (Privacy Policy).
const body = `1. Introduction
RentBuyStay is committed to protecting your personal data. This Privacy Policy explains how we collect, use, store, and share information when you use our platform at www.rentbuystay.com, in compliance with the Nigeria Data Protection Act 2023 (NDPA) and the Nigeria Data Protection Regulation 2019 (NDPR).
2. Information We Collect
We collect the following categories of personal information:
• Account Information: Full name, email address, phone number, and profile details.
• Listing Information: Property details, photographs, pricing, and location data submitted by landlords and agents.
• Transaction Data: Records of enquiries, booking requests, and subscription payments.
• Usage Data: IP address, browser type, pages visited, time spent on the platform, and device identifiers.
• Communications: Messages sent between users via the platform's messaging system.
• Payment Information: Billing details collected during subscription checkout (processed securely via third-party payment processors; we do not store full card details).
3. How We Use Your Information
We use your information to:
• Create and manage your account.
• Display and manage property listings.
• Facilitate communication between users.
• Process subscription payments and manage billing.
• Improve platform features, performance, and user experience.
• Send transactional and service-related notifications.
• Comply with legal obligations and enforce our Terms of Service.
We will not use your personal data for purposes incompatible with those stated above without your prior consent.
4. Legal Basis for Processing
We process your personal data on the following legal bases under the NDPA:
• Performance of a contract: To provide our services to you.• Legitimate interests: To improve our platform and prevent fraud.
• Legal obligation: To comply with applicable Nigerian laws.
• Consent: Where we rely on consent (e.g., marketing communications), you may withdraw it at any time.
5. Data Sharing
We do not sell your personal data. We may share your data with:
• Service Providers: Third parties who assist us in operating the platform (e.g., cloud hosting, payment processors, analytics providers), bound by confidentiality obligations.
• Other Users: Limited listing and contact information shared as part of the platform's functionality.
• Legal Authorities: Where required by law or court order.
6. Data Retention
We retain personal data for as long as your account is active or as needed to provide services. After account deletion, we may retain certain data for up to 7 years for legal, tax, or compliance purposes.
7. Your Rights
Under the NDPA, you have the right to:
• Access the personal data we hold about you.
• Request correction of inaccurate data.
• Request deletion of your data (subject to legal obligations).
• Object to or restrict certain processing activities.
• Data portability in a structured, machine-readable format.
To exercise any of these rights, contact us at: privacy@rentbuystay.com
8. Security
We implement appropriate technical and organisational measures to protect your personal data against
unauthorised access, loss, or destruction. However, no internet transmission is completely secure, and
we cannot guarantee absolute security.
9. Children's Privacy
RentBuyStay is not directed at individuals under the age of 18. We do not knowingly collect personal data from minors. If we become aware that a minor has provided us with personal data, we will delete it promptly.
10. Contact
For privacy-related enquiries, contact our Data Protection Officer at: privacy@rentbuystay.com`;

export default function PrivacyPage() {
  return <LegalPage title="Privacy Policy" body={body} />;
}
