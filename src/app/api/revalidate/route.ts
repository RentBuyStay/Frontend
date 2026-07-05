import { revalidatePath, revalidateTag } from "next/cache";

// On-demand cache invalidation for the blog. The admin (CMS) calls this after a
// post is published, edited, unpublished or deleted, so the cached /blogs pages
// refresh instantly instead of waiting for the hourly safety revalidate.
//
// Auth: a shared secret in the `x-revalidate-secret` header. The caller is the
// admin's own server route, which holds the secret server-side (never the
// browser). Set REVALIDATE_SECRET in this app's environment.
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || request.headers.get("x-revalidate-secret") !== secret) {
    return Response.json({ revalidated: false, error: "Unauthorized" }, { status: 401 });
  }

  let slug: string | undefined;
  try {
    const body = (await request.json()) as { slug?: unknown };
    if (typeof body?.slug === "string" && body.slug) slug = body.slug;
  } catch {
    /* an empty/invalid body is fine — we still revalidate the list */
  }

  // The "blog" tag covers every list + detail fetch; the path calls make the
  // next visit to those routes serve fresh content immediately.
  revalidateTag("blog", "max");
  revalidatePath("/blogs");
  if (slug) revalidatePath(`/blogs/${slug}`);

  return Response.json({ revalidated: true, slug: slug ?? null });
}
