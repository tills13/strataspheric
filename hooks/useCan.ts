import { Permission, can } from "../data/users/permissions";
import { useSession } from "./useSession";

export function useCan() {
  const session = useSession();
  return (...scopes: Permission[]) => can(session?.user, ...scopes);
}
