import LegalPage from "@/components/LegalPage";

export const metadata = {
  title: "Cookie Policy | RentBuyStay",
  description: "How RentBuyStay uses cookies and similar tracking technologies.",
};

// Body text pulled verbatim from Figma node 268:40276 (Cookie Policy).
const body = `1. What Are Cookies?
Cookies are small text files stored on your device when you visit a website. They are widely used to make websites work efficiently, remember your preferences, and provide information to website owners. This Cookie Policy explains how RentBuyStay uses cookies and similar tracking technologies on  www.rentbuystay.com.
2. Types of Cookies We Use
We use the following categories of cookies:
2.1 Strictly Necessary Cookies
These cookies are essential for the platform to function correctly and cannot be disabled. They enable core features such as user authentication, session management, and security. No consent is required for these cookies.
2.2 Performance and Analytics Cookies
These cookies help us understand how users interact with the platform by collecting anonymous data on page views, traffic sources, and user journeys. We use this data to improve the platform's performance and usability. Examples include Google Analytics.
2.3 Functional Cookies
These cookies remember your preferences and settings (such as saved searches, preferred language, and location filters) to provide a more personalised experience.
2.4 Targeting and Advertising Cookies
These cookies may be used to deliver relevant property recommendations and advertisements based on your browsing activity on and off the platform. They are only set with your consent.
3. Third-Party Cookies
Some cookies on our platform are set by third-party service providers, including analytics tools, payment processors, and social media integrations. These third parties have their own privacy and cookie policies, which we encourage you to review. RentBuyStay does not control third-party cookies.
4. Cookie Consent
When you first visit the platform, you will be presented with a cookie consent banner. You may choose to accept all cookies, accept only necessary cookies, or customise your cookie preferences. You can update your preferences at any time through the cookie settings link in the platform footer.Please note that disabling certain cookies may affect the functionality and your experience of the platform.
5. Managing Cookies in Your Browser
In addition to our cookie settings, you can manage cookies through your browser settings. Most browsers allow you to:
• View cookies stored on your device.
• Delete existing cookies.
• Block cookies from specific websites or all websites.
For instructions, refer to your browser's help documentation. Note that blocking all cookies may prevent you from logging in or using key platform features.
6. Cookie Retention
Cookies are retained for varying periods depending on their type:
• Session cookies: Deleted when you close your browser.
• Persistent cookies: Remain on your device for a defined period (typically 30 days to 2 years), unless deleted manually.
7. Updates to This Policy
We may update this Cookie Policy from time to time to reflect changes in technology, law, or our practices. We will notify you of significant changes via a notice on the platform. The effective date at the top of this document indicates when it was last revised.
8. Contact
For questions about our use of cookies: privacy@rentbuystay.com`;

export default function CookiePolicyPage() {
  return <LegalPage title="Cookie Policy" body={body} />;
}
