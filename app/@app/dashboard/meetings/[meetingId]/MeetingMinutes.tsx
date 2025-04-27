import { s } from "../../../../../sprinkles.css";
import * as styles from "./style.css";

import { AddFileToMeetingButton } from "../../../../../components/AddFileToMeetingButton";
import { Button } from "../../../../../components/Button";
import { DividerText } from "../../../../../components/DividerText";
import { FileTypeIcon } from "../../../../../components/FileTypeIcon";
import { Flex } from "../../../../../components/Flex";
import { Group } from "../../../../../components/Group";
import { Header } from "../../../../../components/Header";
import { ArrowForwardIcon } from "../../../../../components/Icon/ArrowForwardIcon";
import { CircleCheckIcon } from "../../../../../components/Icon/CircleCheckIcon";
import { RemoveIcon } from "../../../../../components/Icon/RemoveIcon";
import { SaveIcon } from "../../../../../components/Icon/SaveIcon";
import { TextDocumentIcon } from "../../../../../components/Icon/TextDocumentIcon";
import { InfoPanel } from "../../../../../components/InfoPanel";
import { Input } from "../../../../../components/Input";
import { ExternalLink } from "../../../../../components/Link/ExternalLink";
import { InternalLink } from "../../../../../components/Link/InternalLink";
import { MeetingMinutesTimelineItem } from "../../../../../components/MeetingMinutesTimelineItem";
import { MinutesApprover } from "../../../../../components/MinutesApprover";
import { Stack } from "../../../../../components/Stack";
import { StatusButton } from "../../../../../components/StatusButton";
import { Text } from "../../../../../components/Text";
import { Timeline } from "../../../../../components/Timeline";
import { getMeetingMinutes } from "../../../../../data/meetings/getMeetingMinutes";
import {
  approveMeetingMinutesUrlAction,
  clearMinutesUrlAction,
  updateMinutesUrlAction,
} from "./actions";

interface Props {
  className?: string;
  meetingId: string;
  minutesUrl?: string | null;
  minutesUrlApprovedByName?: string | null;
}

export async function MeetingMinutes({
  className,
  meetingId,
  minutesUrl,
  minutesUrlApprovedByName,
}: Props) {
  const files = await getMeetingMinutes(meetingId);
  const anyApproved = files.some((file) => file.state === "approved");

  return (
    <Stack className={className}>
      <Header as="h3">Minutes</Header>

      {!minutesUrl && files.length === 0 && (
        <InfoPanel>
          <Text>
            <strong>No minutes added to this meeting.</strong> Use the button
            below to add draft minutes or add a URL where council members can
            view and collaboratively edit the minutes for this meeting.
          </Text>
        </InfoPanel>
      )}

      {!anyApproved && files.length === 0 && (
        <form action={updateMinutesUrlAction.bind(undefined, meetingId)}>
          <Flex from="tablet">
            <Input
              actionRight={
                minutesUrl &&
                (minutesUrlApprovedByName ? (
                  <ExternalLink href={minutesUrl} target="_blank">
                    <Button icon={<ArrowForwardIcon />} type="button" />
                  </ExternalLink>
                ) : (
                  <Group gap="small">
                    <StatusButton
                      action={clearMinutesUrlAction.bind(undefined, meetingId)}
                      icon={<RemoveIcon />}
                      color="error"
                      style="secondary"
                    />
                    <StatusButton
                      action={approveMeetingMinutesUrlAction.bind(
                        undefined,
                        meetingId,
                      )}
                      icon={<CircleCheckIcon />}
                      color="success"
                      style="secondary"
                    />
                  </Group>
                ))
              }
              disabled={!!minutesUrlApprovedByName}
              name="minutesUrl"
              label="Minutes URL"
              defaultValue={minutesUrl || ""}
              className={s({ w: "full" })}
            />

            {!minutesUrl && (
              <StatusButton
                className={styles.minutesUrlApproveButton}
                iconRight={<SaveIcon />}
                iconTextBehaviour="centerRemainder"
                color="primary"
                style="primary"
              >
                Add Minutes URL
              </StatusButton>
            )}

            {minutesUrlApprovedByName && (
              <MinutesApprover approverName={minutesUrlApprovedByName} />
            )}
          </Flex>
        </form>
      )}

      {minutesUrl && minutesUrlApprovedByName && (
        <InfoPanel level="success">
          <Text>
            The externally hosted minutes have been approved. Export and upload
            them to your{" "}
            <InternalLink href="/dashboard/files">
              strata&apos;s files
            </InternalLink>{" "}
            to share with other strata members.
          </Text>
        </InfoPanel>
      )}

      {!anyApproved && !minutesUrl && files.length === 0 && (
        <DividerText w="full">OR</DividerText>
      )}

      {files.length !== 0 && (
        <Timeline
          className={s({
            mt: !anyApproved ? "normal" : undefined,
            mb: !anyApproved ? "large" : undefined,
          })}
          items={files.map((file, idx) => ({
            icon: (
              <FileTypeIcon
                defaultIcon={<TextDocumentIcon />}
                filePath={file.path}
              />
            ),
            contents: (
              <MeetingMinutesTimelineItem
                file={file}
                meetingId={meetingId}
                showApproveButton={!anyApproved}
                versionNum={idx + 1}
              />
            ),
          }))}
        />
      )}

      {!anyApproved && !minutesUrl && (
        <AddFileToMeetingButton
          disabled={!!(minutesUrl && minutesUrlApprovedByName)}
          meetingId={meetingId}
          fileType="minutes"
          placeholder="Add Minutes Document"
          color="primary"
          style="primary"
        />
      )}
    </Stack>
  );
}
