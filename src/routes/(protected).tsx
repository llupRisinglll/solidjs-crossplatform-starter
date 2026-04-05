/**
 * Layout for the (protected) route group.
 *
 * All routes inside src/routes/(protected)/ inherit this layout,
 * which wraps them in an AuthGuard. Unauthenticated users are
 * redirected to /login.
 *
 * Route groups use parentheses in the folder name — the group name
 * does NOT appear in the URL. So (protected)/dashboard.tsx → /dashboard.
 */

import type { RouteSectionProps } from "@solidjs/router";
import AuthGuard from "~/components/AuthGuard";

export default function ProtectedLayout(props: RouteSectionProps) {
  return (
    <AuthGuard fallback={<p class="p-8 text-center text-gray-500">Redirecting to login...</p>}>
      {props.children}
    </AuthGuard>
  );
}
