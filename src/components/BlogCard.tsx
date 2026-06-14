import Image from "next/image";
import Link from "next/link";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
};

// Blog card — Figma 268:38915 / 769:88988: a rounded image (r20, all corners) with
// the date + title + excerpt + "Read more" stacked below (no card background).
export default function BlogCard({ p }: { p: BlogPost }) {
  return (
    <Link href={`/blogs/${p.slug}`} className="group flex flex-col gap-6">
      <div className="relative w-full overflow-hidden rounded-[20px]" style={{ height: "260px" }}>
        <Image
          src={p.image}
          alt={p.title}
          fill
          sizes="(min-width: 1024px) 411px, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col" style={{ gap: "16px" }}>
        <span style={{ fontSize: "14px", lineHeight: "24px", fontWeight: 400, color: "#807E7E" }}>
          {p.date}
        </span>
        <div className="flex flex-col" style={{ gap: "8px" }}>
          <h3
            className="group-hover:text-[#305E82] transition-colors line-clamp-2"
            style={{ fontSize: "20px", lineHeight: "32px", fontWeight: 600, color: "#121212", letterSpacing: "-0.02em" }}
          >
            {p.title}
          </h3>
          <p
            className="line-clamp-2"
            style={{ fontSize: "15px", lineHeight: "24px", fontWeight: 400, color: "#807E7E", letterSpacing: "-0.02em" }}
          >
            {p.excerpt}
          </p>
        </div>
        <span
          className="inline-flex items-center group-hover:gap-3 transition-all"
          style={{ gap: "8px", fontSize: "14px", lineHeight: "18px", fontWeight: 500, color: "#305E82", letterSpacing: "-0.02em" }}
        >
          Read more
          <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} />
        </span>
      </div>
    </Link>
  );
}
