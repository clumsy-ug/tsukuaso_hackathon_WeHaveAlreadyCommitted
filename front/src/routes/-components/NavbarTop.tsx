import { Suspense } from "react";
import { getSession } from "~/../../clientSupabase/supabase/auth/getSession";
import DynamicNavbarTop from "./DynamicNavbarTop";
import StaticNavbarTop from "./StaticNavbarTop";

export default function NavbarTop() {
  const user = getSession()

  return (
    <Suspense fallback={<StaticNavbarTop />}>
      <DynamicNavbarTop user={user} />
    </Suspense>
  )
}
