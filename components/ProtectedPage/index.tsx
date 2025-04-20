import { notFound } from "next/navigation";

import { auth } from "../../auth";
import { Permission, can } from "../../data/users/permissions";

interface Props {
  permissions: Permission[];
}

export async function ProtectedPage({
  children,
  permissions,
}: React.PropsWithChildren<Props>) {
  const session = await auth();

  console.log(session?.user, permissions);
  if (!can(session?.user, ...permissions)) {
    notFound();
  }

  return <>{children}</>;
}
