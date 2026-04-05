/**
 * Route guard that redirects unauthenticated users to /login.
 *
 * Works with any auth provider — just replace isAuthenticated() with
 * your own check (e.g., Supabase session, Better Auth context, etc.).
 *
 * Usage in a layout or page:
 *   <AuthGuard fallback={<p>Redirecting...</p>}>
 *     <ProtectedContent />
 *   </AuthGuard>
 *
 * Or wrap a route group layout — see src/routes/(protected)/ for an example.
 */

import { useNavigate } from "@solidjs/router";
import { onMount, Show } from "solid-js";
import type { JSXElement } from "solid-js";
import { isAuthenticated } from "~/lib/auth";

interface AuthGuardProps {
  children: JSXElement;
  /** Shown while checking auth / redirecting. Defaults to nothing. */
  fallback?: JSXElement;
  /** Where to redirect when not authenticated. Defaults to "/login". */
  redirectTo?: string;
}

export default function AuthGuard(props: AuthGuardProps) {
  const navigate = useNavigate();

  onMount(() => {
    if (!isAuthenticated()) {
      navigate(props.redirectTo ?? "/login", { replace: true });
    }
  });

  return (
    <Show when={isAuthenticated()} fallback={props.fallback}>
      {props.children}
    </Show>
  );
}
