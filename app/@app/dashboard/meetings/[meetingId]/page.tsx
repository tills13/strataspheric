import { ProtectedPage } from "../../../../../components/ProtectedPage";
import { MeetingLayout } from "./MeetingLayout";

export default async function Page({
  params,
}: PageProps<"/dashboard/meetings/[meetingId]">) {
  const { meetingId } = await params;

  return (
    <ProtectedPage permissions={["stratas.meetings.view"]}>
      <MeetingLayout meetingId={meetingId} />
    </ProtectedPage>
  );
}
