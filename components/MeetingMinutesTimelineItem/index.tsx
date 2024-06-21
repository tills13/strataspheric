import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import { MeetingMinutes } from "../../data/meetings/getMeetingMinutes";
import { classnames } from "../../utils/classnames";
import { FileLink } from "../FileLink";
import { CircleCheckIcon } from "../Icon/CircleCheckIcon";
import { MinutesApprover } from "../MinutesApprover";
import { Panel } from "../Panel";
import { RemoveButton } from "../RemoveButton";
import { StatusButton } from "../StatusButton";

interface Props {
  approveMeetingMinutes: () => void;
  className?: string;
  deleteMeetingMinutes: () => void;
  file: MeetingMinutes;
  showApproveButton: boolean;
  versionNum: number;
}

export function MeetingMinutesTimelineItem({
  approveMeetingMinutes,
  className,
  deleteMeetingMinutes,
  file,
  showApproveButton,
  versionNum,
}: Props) {
  return (
    <Panel className={classnames(className, styles.meetingMinutesTimelineItem)}>
      <span className={s({ color: "secondary" })}>Version {versionNum}</span>
      <div className={styles.header}>
        <FileLink className={styles.fileName} path={file.path}>
          {file.name}
        </FileLink>
        <div className={styles.headerActions}>
          {file.state === "approved" && file.approverName && (
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
    </Panel>
  );
}
