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

/** URL of the dashboard app's login screen, with an optional post-login return. */
export function appLoginUrl(returnTo?: string): string {
  const base = `${config.appUrl}/log-in`;
  return returnTo ? `${base}?returnTo=${encodeURIComponent(returnTo)}` : base;
}

/** URL of the dashboard app home. */
export function appDashboardUrl(): string {
  return `${config.appUrl}/dashboard`;
}
