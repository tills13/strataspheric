import { LayoutProps } from "../../../../.next/types/app/@app/dashboard/membership/layout";
import { auth } from "../../../../auth";
import { DashboardLayout } from "../../../../components/DashboardLayout";
import { can } from "../../../../data/users/permissions";
import { AddNewMemberButton } from "./AddNewMemberButton";

export default async function Layout({ children }: LayoutProps) {
  const session = await auth();
  return (
    <DashboardLayout
      actions={
        can(session?.user, "stratas.memberships.create") && (
          <AddNewMemberButton />
        )
      }
      title="Directory"
    >
      {children}
    </DashboardLayout>
  );
}
