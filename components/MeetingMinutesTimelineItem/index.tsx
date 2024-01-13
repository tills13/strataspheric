import * as styles from "./style.css";

import { File, NewMeetingMinutes } from "../../data";
import { MeetingMinutes } from "../../data/meetings/getMeetingMinutes";
import { classnames } from "../../utils/classnames";
import { CircleCheckIcon } from "../Icon/CircleCheckIcon";
import { MinutesApprover } from "../MinutesApprover";
import { RemoveButton } from "../RemoveButton";
import { StatusButton } from "../StatusButton";

interface Props {
  approveMeetingMinutes: () => void;
  className?: string;
  deleteMeetingMinutes: () => void;
  file: MeetingMinutes;
  showApproveButton: boolean;
}

export function MeetingMinutesTimelineItem({
  approveMeetingMinutes,
  className,
  deleteMeetingMinutes,
  file,
  showApproveButton,
}: Props) {
  return (
    <div className={classnames(className, styles.meetingMinutesTimelineItem)}>
      <div className={styles.header}>
        <span className={styles.fileName}>{file.name}</span>
        <div className={styles.headerActions}>
          {file.state === "approved" && (
            <MinutesApprover approverName={file.approverName} />
          )}
          {showApproveButton && (
            <>
              <StatusButton
                action={approveMeetingMinutes}
                iconRight={<CircleCheckIcon />}
                iconTextBehaviour="centerRemainder"
                color="success"
                size="small"
              >
                Approve & Publish
              </StatusButton>
              <RemoveButton
                action={deleteMeetingMinutes}
                color="error"
                size="small"
                style="tertiary"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
