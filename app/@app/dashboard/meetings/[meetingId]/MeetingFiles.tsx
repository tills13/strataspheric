import * as styles from "./style.css";

import { AddFileToMeetingButton } from "../../../../../components/AddFileToMeetingButton";
import { FileAttachmentChip } from "../../../../../components/FileAttachmentChip";
import { Group } from "../../../../../components/Group";
import { Header } from "../../../../../components/Header";
import { InfoPanel } from "../../../../../components/InfoPanel";
import { RemoveButton } from "../../../../../components/RemoveButton";
import { Stack } from "../../../../../components/Stack";
import { Text } from "../../../../../components/Text";
import { getMeetingFiles } from "../../../../../data/meetings/getMeetingFiles";
import { removeFileFromMeetingAction } from "./actions";

interface Props {
  className?: string;
  meetingId: string;
}

export async function MeetingFiles({ className, meetingId }: Props) {
  const files = await getMeetingFiles(meetingId);

  return (
    <Stack className={className}>
      <Header as="h3">Meeting Files</Header>

      {files.length === 0 && (
        <InfoPanel>
          <Text>
            <strong>No files have been added to this meeting.</strong> Use the
            button below to add documents for discussion, images, or anything
            else you might need for this meeting.
          </Text>
        </InfoPanel>
      )}

      {files.length !== 0 && (
        <Stack className={styles.meetingFilesList}>
          {files.map((file) => (
            <Group key={file.id} className={styles.meetingFilesListItem}>
              <FileAttachmentChip
                className={styles.meetingFilesListItemAttachmentChip}
                fileName={file.name}
                filePath={file.path}
              />
              <RemoveButton
                action={removeFileFromMeetingAction.bind(
                  undefined,
                  meetingId,
                  "file",
                  file.id,
                )}
                color="error"
                style="secondary"
              />
            </Group>
          ))}
        </Stack>
      )}

      <AddFileToMeetingButton
        color="primary"
        meetingId={meetingId}
        fileType="file"
        placeholder="Add File"
        style="primary"
      />
    </Stack>
  );
}
