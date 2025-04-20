import { PageProps } from "../../../../../.next/types/app/@app/dashboard/meetings/[meetingId]/page";
import { ProtectedPage } from "../../../../../components/ProtectedPage";
import { MeetingLayout } from "./MeetingLayout";

export const runtime = "edge";

export default async function Page({ params }: PageProps) {
  const { meetingId } = await params;

  return (
    <ProtectedPage permissions={["stratas.meetings.view"]}>
      <MeetingLayout meetingId={meetingId} />
    </ProtectedPage>
  );
}
