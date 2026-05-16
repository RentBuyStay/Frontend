"use client";

import { useState } from "react";
import Image from "next/image";
import PlaceBannerAdModal from "./PlaceBannerAdModal";

type Placement = {
  title: string;
  description: string;
  dimensions: string;
  price: string;
  value: string;
};

const placements: Placement[] = [
  {
    title: "Header Strip",
    description:
      "Your banner placed at the top grabs the attention of every potential visitor.",
    dimensions: "1429 x 168px",
    price: "₦150,000/month",
    value: "header-strip",
  },
  {
    title: "Sidebar Ad",
    description:
      "A prominent vertical space perfect for targeted promotions and quick call-to-actions.",
    dimensions: "300 x 600px",
    price: "₦100,000/month",
    value: "sidebar",
  },
  {
    title: "Footer Banner",
    description:
      "Ideal for subtle branding and last impressions, visible on every page bottom.",
    dimensions: "1200 x 90px",
    price: "₦80,000/month",
    value: "footer",
  },
  {
    title: "Middle Strip",
    description: "Position your ad right in the center for maximum visibility",
    dimensions: "800 x 600px",
    price: "₦120,000/month",
    value: "middle-strip",
  },
  {
    title: "Leader Banner",
    description: "Placed in a prime spot on the search result page for immediate impact",
    dimensions: "600 x 300px",
    price: "₦130,000/month",
    value: "leader",
  },
  {
    title: "Side Strip",
    description: "Consistent visibility throughout the user's browsing experience",
    dimensions: "600 x 200px",
    price: "₦110,000/month",
    value: "side-strip",
  },
  {
    title: "Email Notification Footer",
    description:
      "Feature your brand prominently at the footer of our email notifications reaching our users daily.",
    dimensions: "1920 x 1080px (16:9)",
    price: "₦200,000/month",
    value: "email-footer",
  },
  {
    title: "Newsletter Spotlight",
    description:
      "Feature your brand prominently in our weekly newsletter reaching thousands of subscribers.",
    dimensions: "600 x 200px",
    price: "₦110,000/month",
    value: "newsletter",
  },
];

function PlacementCard({
  p,
  onClick,
}: {
  p: Placement;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-[#F5F5F5] text-left hover:shadow-md transition-shadow"
      style={{
        width: "411px",
        height: "429px",
        borderRadius: "24px",
        padding: "16px 16px 24px 16px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <div
        className="bg-white"
        style={{ width: "379px", height: "221px", borderRadius: "20px" }}
      />
      <div className="flex flex-col" style={{ gap: "8px" }}>
        <h3
          style={{
            fontSize: "16px",
            lineHeight: "24px",
            fontWeight: 600,
            color: "#305E82",
          }}
        >
          {p.title}
        </h3>
        <p
          style={{
            fontSize: "14px",
            lineHeight: "28px",
            fontWeight: 400,
            color: "#807E7E",
            letterSpacing: "-0.02em",
          }}
        >
          {p.description}
        </p>
      </div>
      <div className="flex items-center" style={{ gap: "8px" }}>
        <div
          className="flex items-center"
          style={{
            gap: "8px",
            borderRadius: "10px",
            padding: "4px 12px",
            background: "rgba(120, 158, 187, 0.1)",
          }}
        >
          <Image src="/icons/maximize-3.svg" alt="" width={16} height={16} />
          <span
            style={{
              fontSize: "12px",
              lineHeight: "24px",
              fontWeight: 500,
              color: "#305E82",
            }}
          >
            {p.dimensions}
          </span>
        </div>
        <div
          className="flex items-center"
          style={{
            gap: "8px",
            borderRadius: "10px",
            padding: "4px 12px",
            background: "rgba(120, 158, 187, 0.1)",
          }}
        >
          <Image src="/icons/tag-2.svg" alt="" width={16} height={16} />
          <span
            style={{
              fontSize: "12px",
              lineHeight: "24px",
              fontWeight: 500,
              color: "#305E82",
            }}
          >
            {p.price}
          </span>
        </div>
      </div>
    </button>
  );
}

export default function PlacementCards() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | undefined>(undefined);

  return (
    <>
      <div
        className="grid mx-auto"
        style={{
          gridTemplateColumns: "repeat(3, 411px)",
          gap: "40px 24px",
          marginTop: "40px",
          justifyContent: "center",
        }}
      >
        {placements.map((p) => (
          <PlacementCard
            key={p.value}
            p={p}
            onClick={() => {
              setSelected(p.value);
              setOpen(true);
            }}
          />
        ))}
      </div>
      <PlaceBannerAdModal
        open={open}
        initialPlacement={selected}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
