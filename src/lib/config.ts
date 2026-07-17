/**
 * Centralised runtime config. Reads NEXT_PUBLIC_* env vars (inlined by Next.js
 * at build time) so every consumer goes through one typed accessor instead of
 * touching process.env directly.
 */

function required(name: string, value: string | undefined): string {
  if (!value) {
    // Surface misconfiguration loudly in dev; in prod the build would already
    // have inlined the value, so a miss here means the env var was never set.
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[config] Missing env var ${name}. Falling back to empty string.`);
    }
    return "";
  }
  return value.replace(/\/+$/, ""); // strip trailing slashes for clean URL joins
}

export const config = {
  apiBaseUrl: required("NEXT_PUBLIC_API_BASE_URL", process.env.NEXT_PUBLIC_API_BASE_URL),
  // The logged-in dashboard app. Login and account actions redirect here; the
  // shared auth cookie means the user is recognised on both sites.
  appUrl: (process.env.NEXT_PUBLIC_APP_URL ?? "https://rentbuystay-app.vercel.app").replace(/\/+$/, ""),
} as const;

/**
 * URL of the dashboard app's login screen, with an optional post-login return
 * and email prefill.
 *
 * Sessions can't be shared between the two apps today: tokens live in
 * localStorage, which is per-origin, and the API's cookie is third-party across
 * these two unrelated *.vercel.app domains (Safari blocks it outright). So the
 * marketing site never holds a session — it hands off to the app, which owns
 * auth. Once both sites move to *.rentbuystay.com the API cookie becomes
 * first-party and true single sign-on is possible.
 */
export function appLoginUrl(opts?: { returnTo?: string; email?: string }): string {
  const params = new URLSearchParams();
  if (opts?.returnTo) params.set("returnTo", opts.returnTo);
  if (opts?.email) params.set("email", opts.email);
  const qs = params.toString();
  return `${config.appUrl}/log-in${qs ? `?${qs}` : ""}`;
}

/** URL of the dashboard app home. */
export function appDashboardUrl(): string {
  return `${config.appUrl}/dashboard`;
}

/** Account types the sign-up screen accepts, shared with the app via `?type=`. */
export type SignUpType = "seeker" | "agent" | "owner" | "agency";

/**
 * URL of the dashboard app's sign-up screen. Registration lives in the app, so
 * "Get Started Free" hands off there with the chosen account type preselected.
 */
export function appSignUpUrl(type?: SignUpType): string {
  const base = `${config.appUrl}/sign-up`;
  return type ? `${base}?type=${type}` : base;
}
