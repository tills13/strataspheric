import { auth } from "../../../../auth";
import { ProtectedPage } from "../../../../components/ProtectedPage";
import { can } from "../../../../data/users/permissions";
import { SettingsPage } from "./SettingsPage";

export default async function Page() {
  const session = await auth();
  const canEdit = can(session?.user, "stratas.settings.edit");

  return (
    <ProtectedPage permissions={["stratas.settings.view"]}>
      <SettingsPage canEdit={canEdit} />
    </ProtectedPage>
  );
}
