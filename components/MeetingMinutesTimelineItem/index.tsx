import * as styles from "./style.css";

import {
  approveMeetingMinutesAction,
  removeFileFromMeetingAction,
} from "../../app/@app/dashboard/meetings/[meetingId]/actions";
import { MeetingMinutes } from "../../data/meetings/getMeetingMinutes";
import { classnames } from "../../utils/classnames";
import { Badge } from "../Badge";
import { FileLink } from "../FileLink";
import { Flex } from "../Flex";
import { Group } from "../Group";
import { CircleCheckIcon } from "../Icon/CircleCheckIcon";
import { MinutesApprover } from "../MinutesApprover";
import { Panel } from "../Panel";
import { RemoveButton } from "../RemoveButton";
import { StatusButton } from "../StatusButton";
import { Text } from "../Text";

interface Props {
  className?: string;
  file: MeetingMinutes;
  meetingId: string;
  showApproveButton: boolean;
  versionNum: number;
}

export function MeetingMinutesTimelineItem({
  className,
  file,
  meetingId,
  showApproveButton,
  versionNum,
}: Props) {
  return (
    <Panel className={classnames(className, styles.meetingMinutesTimelineItem)}>
      <Flex from="tablet" justify="space-between">
        <Group align="center">
          <Badge level="default">VERSION #{versionNum}</Badge>
          <FileLink
            className={styles.fileNameContainer}
            path={file.path}
            noUnderline
          >
            <Text
              as="span"
              color="primary"
              className={styles.fileName}
              fw="bold"
            >
              {file.name}
            </Text>
          </FileLink>
        </Group>

        <Group>
          {file.state === "approved" && file.approverName && (
            <MinutesApprover approverName={file.approverName} />
          )}
          {showApproveButton && (
            <>
              <StatusButton
                action={approveMeetingMinutesAction.bind(
                  undefined,
                  meetingId,
                  file.id,
                )}
                icon={<CircleCheckIcon />}
                iconTextBehaviour="centerRemainder"
                color="success"
              >
                Approve & Publish
              </StatusButton>
              <RemoveButton
                action={removeFileFromMeetingAction.bind(
                  undefined,
                  meetingId,
                  "minutes",
                  file.id,
                )}
                color="error"
                style="tertiary"
              />
            </>
          )}
        </Group>
      </Flex>
    </Panel>
  );
}
