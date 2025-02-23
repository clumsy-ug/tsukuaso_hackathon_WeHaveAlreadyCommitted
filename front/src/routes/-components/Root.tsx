import { Suspense } from "react";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { getSession } from "~/../../clientSupabase/supabase/auth/getSession";
import LoginContextProvider from "./LoginContextProvider";
import HomePending from "./HomePending";

export default function Root() {
  const user = getSession()

  return (
    <>
      <Suspense fallback={<HomePending />}>
        <LoginContextProvider user={user} />
      </Suspense>
      <TanStackRouterDevtools />
    </>
  )
}
