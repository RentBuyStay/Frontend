import { config } from "@/lib/config";

/** Shape consumed by the blog list/detail UI (unchanged from the demo data). */
export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  bodyHtml: string;
};

/** Published post as returned by the public GET /blog endpoints. */
type ApiBlogPost = {
  id: string;
  title: string;
  body?: string | null;
  coverImageUrl?: string | null;
  slug: string;
  publishedAt?: string | null;
  createdAt?: string | null;
  authorName?: string | null;
};

const FALLBACK_IMAGE = "/images/blog-featured.png";

function toExcerpt(html?: string | null): string {
  const text = (html ?? "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return text.length > 180 ? `${text.slice(0, 180).trimEnd()}…` : text;
}

function fmtDate(iso?: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? ""
    : d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function resolveImage(url?: string | null): string {
  if (!url) return FALLBACK_IMAGE;
  if (/^https?:\/\//.test(url)) return url;
  return `${config.apiBaseUrl}${url.startsWith("/") ? "" : "/"}${url}`;
}

function toBlogPost(b: ApiBlogPost): BlogPost {
  return {
    slug: b.slug,
    title: b.title,
    excerpt: toExcerpt(b.body),
    image: resolveImage(b.coverImageUrl),
    date: fmtDate(b.publishedAt ?? b.createdAt),
    bodyHtml: b.body ?? "",
  };
}

/** Published posts (most recent first). Returns [] on any failure so the page still renders. */
export async function getBlogPosts(size = 12): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${config.apiBaseUrl}/blog?page=0&size=${size}`, {
      next: { tags: ["blog"], revalidate: 3600 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    const content: ApiBlogPost[] = json?.data?.content ?? [];
    return content.map(toBlogPost);
  } catch {
    return [];
  }
}

/** A single published post by slug, or null if not found. */
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(`${config.apiBaseUrl}/blog/${encodeURIComponent(slug)}`, {
      next: { tags: ["blog"], revalidate: 3600 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data ? toBlogPost(json.data as ApiBlogPost) : null;
  } catch {
    return null;
  }
}
