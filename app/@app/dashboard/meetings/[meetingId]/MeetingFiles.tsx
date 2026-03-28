import * as styles from "./style.css";

import { AddFileToMeetingButton } from "../../../../../components/AddFileToMeetingButton";
import { FileAttachmentChip } from "../../../../../components/FileAttachmentChip";
import { Group } from "../../../../../components/Group";
import { Header } from "../../../../../components/Header";
import { InfoPanel } from "../../../../../components/InfoPanel";
import { RemoveButton } from "../../../../../components/RemoveButton";
import { Stack } from "../../../../../components/Stack";
import { Table } from "../../../../../components/Table";
import { TableRow } from "../../../../../components/Table/TableRow";
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
        <InfoPanel
          className={styles.meetingAgendaEmptyInfoPanel}
          level="hint"
          align="center"
          justify="center"
        >
          <Text textAlign="center">
            <strong>No files have been added to this meeting.</strong>
            <br />
            Use the button below to add documents for discussion, images, or
            anything else you might need for this meeting.
          </Text>
        </InfoPanel>
      )}

      {files.length !== 0 && (
        <Table>
          {files.map((file) => (
            <TableRow
              key={file.id}
              rowId={file.id}
              content={
                <FileAttachmentChip
                  fileName={file.name}
                  filePath={file.path}
                  linked={false}
                />
              }
              actions={
                <RemoveButton
                  action={removeFileFromMeetingAction.bind(
                    undefined,
                    meetingId,
                    "file",
                    file.id,
                  )}
                  size="small"
                  color="error"
                  style="tertiary"
                />
              }
            />
          ))}
        </Table>
      )}

      <Group justify="end">
        <AddFileToMeetingButton
          color="primary"
          meetingId={meetingId}
          fileType="file"
          placeholder="Add File"
          style="primary"
          iconTextBehaviour="centerRemainder"
        />
      </Group>
    </Stack>
  );
}
