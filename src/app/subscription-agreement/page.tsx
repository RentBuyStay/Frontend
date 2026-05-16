import LegalPage from "@/components/LegalPage";

export const metadata = {
  title: "Subscription Agreement | RentBuyStay",
  description: "Subscription Agreement for paid plans on the RentBuyStay platform.",
};

// Body text pulled verbatim from Figma node 268:39947 (Subscription Agreement).
const body = `1. Scope
This Subscription Agreement ('Agreement') governs paid subscription plans available to Property Owners, Landlords, and Real Estate Agents ('Subscribers') on the RentBuyStay platform. It forms part of, and should be read together with, our Terms of Service.
2. Subscription Plans
RentBuyStay offers tiered subscription plans for landlords/property owners and real estate agents. Each plan includes specified allowances for property listings, featured placements, enquiry management tools, and other premium features. Full details of current plans, including pricing in Nigerian Naira (NGN), are
available at www.rentbuystay.com/pricing.
RentBuyStay reserves the right to modify, add, or discontinue any subscription plan upon reasonable notice to existing subscribers.
3. Billing and Payment
Subscriptions are billed in advance on a monthly or annual basis, as selected by the Subscriber. Payments are processed in NGN via our authorised payment processors. By providing payment details, you authorise us to charge your payment method for the applicable subscription fee. All subscription fees are exclusive of applicable taxes, including VAT where required by Nigerian law. Taxes will be displayed at checkout where applicable.
If a payment fails, we will notify you and provide a grace period of 7 days to update your payment method. After this period, your subscription may be suspended or downgraded to a free tier.
4. Auto-Renewal
Subscriptions automatically renew at the end of each billing cycle unless cancelled before the renewal date. You will receive a reminder notification at least 5 days before renewal. You may cancel auto-renewal at any time through your account settings.
5. Cancellation and Refunds
You may cancel your subscription at any time. Cancellation takes effect at the end of the current billing period, and you will continue to have access to paid features until that date. We do not offer refunds for partial billing periods, except where required by Nigerian consumer protection law.
To cancel, log into your account settings or contact us at subscriptions@rentbuystay.com.6. Free Trials Where a free trial is offered, it will be clearly communicated at the point of sign-up. Your subscription will automatically convert to a paid plan at the end of the trial unless you cancel before the trial period ends. You will not be charged during the trial period.
7. Subscriber Obligations
As a Subscriber, you agree to:
• Use the platform's listing and management tools only for legitimate, lawful property transactions.
• Ensure all listings posted under your subscription are accurate and compliant with our listing
policies.
• Not share, transfer, or resell your subscription access to third parties.
8. Suspension and Termination
We reserve the right to suspend or terminate a subscription without refund if the Subscriber is found to be in material breach of these Terms, including fraudulent listings, abuse of the platform, or non-payment.
9. Changes to Pricing
We will provide at least 30 days' notice of any changes to subscription pricing via email and platform notification. Continued use of the subscription after the effective date of a price change constitutes acceptance of the new price.
10. Contact
For subscription enquiries: subscriptions@rentbuystay.com`;

export default function SubscriptionAgreementPage() {
  return <LegalPage title="Subscription Agreement" body={body} />;
}
