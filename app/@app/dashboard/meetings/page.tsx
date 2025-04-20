import { ProtectedPage } from "../../../../components/ProtectedPage";
import { MeetingsPage } from "./MeetingsPage";

export const runtime = "edge";

export default async function Page() {
  return (
    <ProtectedPage permissions={["stratas.meetings.view"]}>
      <MeetingsPage />
    </ProtectedPage>
  );
}
