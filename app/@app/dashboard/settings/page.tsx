import { ProtectedPage } from "../../../../components/ProtectedPage";
import { SettingsPage } from "./SettingsPage";


export default async function Page() {
  return (
    <ProtectedPage permissions={["stratas.edit"]}>
      <SettingsPage />
    </ProtectedPage>
  );
}
