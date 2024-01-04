import { redirect } from "next/navigation";

import { auth } from "../../../../../auth";
import { UpdateProfileForm } from "./UpdateProfileForm";

export const runtime = "edge";

export default async function Page() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return <UpdateProfileForm user={session.user} />;
}
