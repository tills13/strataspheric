import { redirect } from "next/navigation";

import { auth } from "../../../auth";
import { StaticPageContainer } from "../StaticPageContainer";
import { UpdateProfileForm } from "./UpdateProfileForm";

export const runtime = "edge";

export default async function Page() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <StaticPageContainer>
      <UpdateProfileForm user={session.user} />
    </StaticPageContainer>
  );
}
