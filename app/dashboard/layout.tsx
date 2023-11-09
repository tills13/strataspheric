import { redirect } from "next/navigation";
import { auth } from "../../auth";
import { getStrata } from "../../data/stratas";
import Link from "next/link";

export const runtime = "edge";

export default async function Layout({ children }) {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  const strata = await getStrata();

  if (!strata) {
    return <div>Strata does not exist</div>;
  }

  return (
    <div>
      <div>
        <h1>{strata.name}</h1>
        <Link href="/dashboard/membership">View Membership</Link>
      </div>
      {children}
    </div>
  );
}
