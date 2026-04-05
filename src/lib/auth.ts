/**
 * Authentication utilities stub.
 *
 * This module provides a pattern for token management and authenticated
 * fetch calls. Replace the token storage and retrieval logic with your
 * auth provider (Better Auth, Supabase, Firebase, Lucia, etc.).
 */

import { getApiBaseUrl } from "~/lib/api";

// --- Token storage (replace with your auth provider's approach) -----------

let accessToken: string | null = null;

/** Store the token after login. Call this from your auth callback. */
export function setToken(token: string | null) {
  accessToken = token;
  if (token) {
    localStorage.setItem("auth_token", token);
  } else {
    localStorage.removeItem("auth_token");
  }
}

/** Read the current token. Returns null if not authenticated. */
export function getToken(): string | null {
  if (!accessToken && typeof localStorage !== "undefined") {
    accessToken = localStorage.getItem("auth_token");
  }
  return accessToken;
}

/** Clear the token on logout. */
export function clearToken() {
  setToken(null);
}

/** Check if the user has a stored token (does not validate it). */
export function isAuthenticated(): boolean {
  return getToken() !== null;
}

// --- Authenticated fetch -------------------------------------------------

/**
 * Fetch wrapper that attaches the auth token as a Bearer header.
 * Redirects to /login on 401 responses (session expired).
 *
 * Usage:
 *   const res = await fetchWithAuth("/api/me");
 *   const user = await res.json();
 */
export async function fetchWithAuth(
  path: string,
  init?: RequestInit,
): Promise<Response> {
  const base = getApiBaseUrl();
  const token = getToken();

  const headers = new Headers(init?.headers);
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(`${base}${path}`, { ...init, headers });

  if (res.status === 401) {
    clearToken();
    // Redirect to login — adjust the path for your app
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }

  return res;
}
