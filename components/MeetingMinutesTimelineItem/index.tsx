import { File } from "../../data";

interface Props {
  file: File;
}

export function MeetingMinutesTimelineItem({ file }: Props) {
  return <div>{file.name}</div>;
}
