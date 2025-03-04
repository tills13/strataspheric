import { useSession } from "next-auth/react";

import { can } from "../data/users/permissions";

export function useCan() {
  const { data: session } = useSession();
  return (...scopes: string[]) => can(session?.user, ...scopes);
}
