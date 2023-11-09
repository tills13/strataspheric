import { redirect } from "next/navigation";
import { auth } from "../../auth";
import { SignInForm } from "../../components/SignInForm";

export const runtime = "edge";

export default async function Page() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return <SignInForm />;
}
