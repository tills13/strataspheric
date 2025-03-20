import { can } from "../data/users/permissions";
import { useSession } from "./useSession";

export function useCan() {
  const session = useSession();
  return (...scopes: string[]) => can(session?.user, ...scopes);
}
