import { s } from "../../../../../sprinkles.css";
import * as styles from "./style.css";

import { AddFileToMeetingButton } from "../../../../../components/AddFileToMeetingButton";
import { DividerText } from "../../../../../components/DividerText";
import { FileTypeIcon } from "../../../../../components/FileTypeIcon";
import { Flex } from "../../../../../components/Flex";
import { Group } from "../../../../../components/Group";
import { Header } from "../../../../../components/Header";
import { CircleCheckIcon } from "../../../../../components/Icon/CircleCheckIcon";
import { RightIcon } from "../../../../../components/Icon/RightIcon";
import { SaveIcon } from "../../../../../components/Icon/SaveIcon";
import { TextDocumentIcon } from "../../../../../components/Icon/TextDocumentIcon";
import { InfoPanel } from "../../../../../components/InfoPanel";
import { Input } from "../../../../../components/Input";
import { ExternalLink } from "../../../../../components/Link/ExternalLink";
import { InternalLink } from "../../../../../components/Link/InternalLink";
import { MeetingMinutesTimelineItem } from "../../../../../components/MeetingMinutesTimelineItem";
import { MinutesApprover } from "../../../../../components/MinutesApprover";
import { RemoveButton } from "../../../../../components/RemoveButton";
import { Stack } from "../../../../../components/Stack";
import { StatusButton } from "../../../../../components/StatusButton";
import { Text } from "../../../../../components/Text";
import { Timeline } from "../../../../../components/Timeline";
import { getMeetingMinutes } from "../../../../../data/meetings/getMeetingMinutes";
import { classnames } from "../../../../../utils/classnames";
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
            {!minutesUrl ? (
              <Input
                className={classnames(styles.minutesUrlInput, s({ w: "full" }))}
                name="minutesUrl"
                label="Minutes URL"
              />
            ) : (
              <ExternalLink
                className={classnames(s({ w: "full" }), styles.minutesUrl)}
                href={minutesUrl}
              >
                {minutesUrl} <RightIcon height={24} />
              </ExternalLink>
            )}

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

            {minutesUrl ? (
              minutesUrlApprovedByName ? (
                <MinutesApprover
                  approverName={minutesUrlApprovedByName}
                  className={styles.minutesUrlApprover}
                />
              ) : (
                <Group className={styles.minutesUrlActionsContainer}>
                  <StatusButton
                    className={styles.minutesUrlApproveButton}
                    action={approveMeetingMinutesUrlAction.bind(
                      undefined,
                      meetingId,
                    )}
                    iconRight={<CircleCheckIcon />}
                    iconTextBehaviour="centerRemainder"
                    color="success"
                  >
                    Approve
                  </StatusButton>
                  <RemoveButton
                    action={clearMinutesUrlAction.bind(undefined, meetingId)}
                    color="error"
                    style="tertiary"
                  />
                </Group>
              )
            ) : null}
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
