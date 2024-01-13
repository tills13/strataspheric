import { s } from "../../../../../../sprinkles.css";

import { AddFileToMeetingButton } from "../../../../../../components/AddFileToMeetingButton";
import { Header } from "../../../../../../components/Header";
import { InfoPanel } from "../../../../../../components/InfoPanel";
import { Panel } from "../../../../../../components/Panel";
import { getMeetingFiles } from "../../../../../../data/meetings/getMeetingFiles";
import { upsertFileAction } from "../../actions";
import { addFileToMeetingAction } from "./actions";

interface Props {
  className?: string;
  meetingId: string;
}

export async function MeetingFiles({ className, meetingId }: Props) {
  const files = await getMeetingFiles(meetingId);

  return (
    <div className={className}>
      <Header className={s({ mb: "normal" })} priority={2}>
        Files
      </Header>

      <Panel>
        {files.length === 0 && (
          <InfoPanel className={s({ mb: "normal" })}>
            <strong>No files added to this meeting.</strong> Use the button
            below to add documents for discussion, images, or anything else you
            might need for this meeting.
          </InfoPanel>
        )}

        <AddFileToMeetingButton
          addFileToMeeting={addFileToMeetingAction.bind(
            undefined,
            meetingId,
            "minutes",
          )}
          attachFileText="Add File"
          upsertFile={upsertFileAction.bind(undefined, undefined)}
        />
      </Panel>
    </div>
  );
}
