import { redirect } from "next/navigation";

import { auth } from "../../../../auth";
import { listStrataMemberships } from "../../../../data/memberships/listStrataMemberships";
import { StaticPageContainer } from "../StaticPageContainer";
import { UpdateProfileForm } from "./UpdateProfileForm";

export default async function Page() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  const memberships = await listStrataMemberships({ userId: session.user.id });

  return (
    <StaticPageContainer>
      <UpdateProfileForm memberships={memberships} user={session.user} />
    </StaticPageContainer>
  );
}
