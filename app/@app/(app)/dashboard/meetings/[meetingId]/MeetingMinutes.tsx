import { FileTypeIcon } from "../../../../../../components/FileTypeIcon";
import { Header } from "../../../../../../components/Header";
import { MeetingMinutesTimelineItem } from "../../../../../../components/MeetingMinutesTimelineItem";
import { Timeline } from "../../../../../../components/Timeline";
import { getMeetingMinutes } from "../../../../../../data/meetings/getMeetingMinutes";

interface Props {
  meetingId: string;
}

export async function MeetingMinutes({ meetingId }: Props) {
  const files = await getMeetingMinutes(meetingId);

  return (
    <>
      <Header priority={2}>Minutes</Header>

      <Timeline
        items={files.map((file) => ({
          icon: <FileTypeIcon filePath={file.path} />,
          contents: <MeetingMinutesTimelineItem file={file} />,
        }))}
      />
    </>
  );
}
