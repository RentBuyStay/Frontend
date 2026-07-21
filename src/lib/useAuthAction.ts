"use client";

import { useGetMeQuery } from "@/services/meApi";
import { config, appLoginUrl } from "@/lib/config";

/**
 * The single place the marketing site decides what an auth-gated action does —
 * use this for ANY action that needs a signed-in user (contact/message/inspect a
 * listing, save, post a property/request, open the dashboard, …), never inline
 * the decision per component.
 *
 * Auth lives in the dashboard app. Without SSO (default) this site is on a
 * different domain and can't see that session, so every gated action hands off
 * to the app, which owns auth (a signed-in user is forwarded straight through; a
 * signed-out one is prompted to log in and returned). With SSO on (both apps on
 * one parent domain + the API cookie scoped to `.rentbuystay.com`) the session
 * is shared, so `/me` is trusted and auth is respected locally.
 */
export function useAuthAction() {
  // `/me` is only meaningful when the session is shared (SSO). Off, it can't see
  // the app's cross-domain session, so skip the call and treat as signed-out here.
  const { data: me } = useGetMeQuery(undefined, { skip: !config.sso });
  const isAuthed = !!me;

  /** Send to the app's login, returning to the current page afterwards. Safe to
   *  pass directly as an event handler (takes no args). */
  const goToLogin = () =>
    window.location.assign(
      appLoginUrl({ returnTo: typeof window !== "undefined" ? window.location.href : undefined }),
    );

  /** Open a path inside the dashboard app (e.g. "/dashboard/browse/<id>"). */
  const openInApp = (appPath: string) =>
    window.location.assign(`${config.appUrl}${appPath.startsWith("/") ? appPath : `/${appPath}`}`);

  /**
   * Perform an auth-gated action: go to its place in the app when signed in (or
   * in hand-off mode), otherwise send to login and come back. `appPath` is where
   * the action lives in the app, e.g. `/dashboard/browse/<id>`.
   */
  const requireAuth = (appPath: string) => {
    if (config.sso && !isAuthed) {
      goToLogin();
      return;
    }
    openInApp(appPath);
  };

  return { isAuthed, requireAuth, goToLogin, openInApp };
}
