import { s } from "../../../../../sprinkles.css";
import * as styles from "./style.css";

import { AddFileToMeetingButton } from "../../../../../components/AddFileToMeetingButton";
import { FileTypeIcon } from "../../../../../components/FileTypeIcon";
import { Header } from "../../../../../components/Header";
import { TextDocumentIcon } from "../../../../../components/Icon/TextDocumentIcon";
import { InfoPanel } from "../../../../../components/InfoPanel";
import { ExternalLink } from "../../../../../components/Link/ExternalLink";
import { Panel } from "../../../../../components/Panel";
import { RemoveButton } from "../../../../../components/RemoveButton";
import { getMeetingFiles } from "../../../../../data/meetings/getMeetingFiles";
import { upsertFileAction } from "../../actions";
import { addFileToMeetingAction, removeFileFromMeetingAction } from "./actions";

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

      {files.length === 0 && (
        <InfoPanel className={s({ mb: "normal" })}>
          <strong>No files added to this meeting.</strong> Use the button below
          to add documents for discussion, images, or anything else you might
          need for this meeting.
        </InfoPanel>
      )}

      <div className={s({ mb: "normal" })}>
        {files.map((file) => (
          <div key={file.id} className={styles.meetingFileContainer}>
            <div className={styles.meetingFile}>
              <FileTypeIcon
                className={styles.icon}
                defaultIcon={<TextDocumentIcon className={styles.icon} />}
                filePath={file.path}
              />{" "}
              <ExternalLink href={file.path} target="_blank">
                {file.name}
              </ExternalLink>
            </div>
            <RemoveButton
              action={removeFileFromMeetingAction.bind(
                undefined,
                meetingId,
                "file",
                file.id,
              )}
              color="error"
              size="small"
              style="tertiary"
            />
          </div>
        ))}
      </div>

      <AddFileToMeetingButton
        addFileToMeeting={addFileToMeetingAction.bind(
          undefined,
          meetingId,
          "file",
        )}
        attachFileText="Add File"
        upsertFile={upsertFileAction.bind(undefined, undefined)}
      />
    </div>
  );
}
