import GetStartedFreeButton from "./GetStartedFreeButton";
import LogInButton from "./LogInButton";

// "Ready to List Your Property?" CTA — shared across landing pages.
// Figma 133:18774 ("newsletter"): card r:20, gradient 174deg #75A3C7 → #305E82 96%.
// Responsive: 296px card / 24px heading on mobile, 464px / 48px from md up.
// Buttons open the auth modals per the Figma prototype (create-account / login).
export default function ListPropertyCTA() {
  return (
    <section className="bg-white">
      <div className="w-full px-4 py-4 md:px-6 md:py-6">
        <div
          className="rounded-[20px] h-[296px] md:h-[464px] flex flex-col items-center justify-center text-white text-center px-4 md:px-6"
          style={{ background: "linear-gradient(174deg, #75A3C7 0%, #305E82 96%)" }}
        >
          <h2 className="font-semibold mb-2 md:mb-4 max-w-[500px] text-[24px] leading-[32px] md:text-[48px] md:leading-[64px]">
            Ready to<br />List Your Property?
          </h2>
          <p className="mb-6 md:mb-10 max-w-[600px] text-[12px] leading-[24px] md:text-[18px] md:leading-[35px] tracking-[-0.02em]">
            Join thousands of owners and agents on Nigeria&rsquo;s fastest-growing
            property platform. Get verified, list your property, and reach millions
            of seekers.
          </p>
          <div className="flex items-center gap-4">
            <GetStartedFreeButton
              className="flex items-center justify-center text-white font-medium h-12 px-6 rounded-[12px] hover:opacity-90 transition-opacity whitespace-nowrap"
              style={{ fontSize: "14px", background: "#FFAE00", border: "1px solid rgba(120,158,187,0.5)" }}
            />
            <LogInButton
              className="flex items-center justify-center text-white font-medium h-12 px-8 hover:underline whitespace-nowrap"
              style={{ fontSize: "14px" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
