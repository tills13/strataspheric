import * as styles from "./style.css";

import { Event, Meeting } from "../../data";
import { classnames } from "../../utils/classnames";
import {
  formatDateForDatetime,
  patchTimezoneOffset,
} from "../../utils/datetime";
import { AddIcon } from "../Icon/AddIcon";
import { Input } from "../Input";
import { StatusButton } from "../StatusButton";

interface Props {
  createOrUpdateMeeting: (fd: FormData) => void;
  meeting?: Meeting & Pick<Event, "startDate" | "endDate">;
}

export function CreateOrUpdateMeetingForm({
  createOrUpdateMeeting,
  meeting,
}: Props) {
  return (
    <form
      action={async (fd) => {
        patchTimezoneOffset(fd, "startDate");
        patchTimezoneOffset(fd, "endDate");

        await createOrUpdateMeeting(fd);
      }}
    >
      <Input
        className={classnames(styles.fullWidth, styles.withBottomMargin)}
        name="purpose"
        placeholder="Purpose"
        defaultValue={meeting?.purpose}
      />

      <div className={classnames(styles.dateWrapper, styles.withBottomMargin)}>
        <Input
          className={styles.fullWidth}
          name="startDate"
          placeholder="Scheduled Start"
          type="datetime-local"
          defaultValue={
            meeting?.startDate
              ? formatDateForDatetime(meeting.startDate)
              : undefined
          }
        />
        <Input
          className={styles.fullWidth}
          name="endDate"
          placeholder="Scheduled End"
          type="datetime-local"
          defaultValue={
            meeting?.endDate
              ? formatDateForDatetime(meeting.endDate)
              : undefined
          }
        />
      </div>

      <StatusButton
        iconRight={<AddIcon />}
        color="primary"
        style="secondary"
        type="submit"
      >
        {meeting ? "Update Meeting" : "Create Meeting"}
      </StatusButton>
    </form>
  );
}
