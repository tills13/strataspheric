import { ProtectedPage } from "../../../../components/ProtectedPage";
import { SettingsPage } from "./SettingsPage";

export const runtime = "edge";

export default async function Page() {
  return (
    <ProtectedPage permissions={["stratas.edit"]}>
      <SettingsPage />
    </ProtectedPage>
  );
}
