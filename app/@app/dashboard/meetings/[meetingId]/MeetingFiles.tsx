import { s } from "../../../../../sprinkles.css";
import * as styles from "./style.css";

import { AddFileToMeetingButton } from "../../../../../components/AddFileToMeetingButton";
import { FileTypeIcon } from "../../../../../components/FileTypeIcon";
import { Group } from "../../../../../components/Group";
import { Header } from "../../../../../components/Header";
import { TextDocumentIcon } from "../../../../../components/Icon/TextDocumentIcon";
import { InfoPanel } from "../../../../../components/InfoPanel";
import { ExternalLink } from "../../../../../components/Link/ExternalLink";
import { RemoveButton } from "../../../../../components/RemoveButton";
import { Stack } from "../../../../../components/Stack";
import { Text } from "../../../../../components/Text";
import { getMeetingFiles } from "../../../../../data/meetings/getMeetingFiles";
import { upsertFileAction } from "../../files/actions";
import { addFileToMeetingAction, removeFileFromMeetingAction } from "./actions";

interface Props {
  className?: string;
  meetingId: string;
}

export async function MeetingFiles({ className, meetingId }: Props) {
  const files = await getMeetingFiles(meetingId);

  return (
    <div className={className}>
      <Header className={s({ mb: "normal" })} as="h2">
        Files
      </Header>

      {files.length === 0 && (
        <InfoPanel className={s({ mb: "normal" })}>
          <Text>
            <strong>No files have been added to this meeting.</strong> Use the
            button below to add documents for discussion, images, or anything
            else you might need for this meeting.
          </Text>
        </InfoPanel>
      )}

      <Stack className={s({ mb: "normal" })}>
        {files.map((file) => (
          <Group key={file.id} justify="space-between">
            <Group>
              <FileTypeIcon
                className={styles.icon}
                defaultIcon={<TextDocumentIcon className={styles.icon} />}
                filePath={file.path}
              />{" "}
              <ExternalLink href={file.path} target="_blank">
                {file.name}
              </ExternalLink>
            </Group>
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
          </Group>
        ))}
      </Stack>

      <AddFileToMeetingButton
        addFileToMeeting={addFileToMeetingAction.bind(
          undefined,
          meetingId,
          "file",
        )}
        placeholder="Add File"
        upsertFile={upsertFileAction.bind(undefined, undefined)}
      />
    </div>
  );
}
