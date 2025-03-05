import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import { Event, Meeting } from "../../data";
import { classnames } from "../../utils/classnames";
import {
  formatDateForDatetime,
  patchTimezoneOffset,
} from "../../utils/datetime";
import { DateInput } from "../DateInput";
import { AddIcon } from "../Icon/AddIcon";
import { Input } from "../Input";
import { StatusButton } from "../StatusButton";

interface Props {
  createOrUpdateMeeting: (fd: FormData) => Promise<any>;
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
        className={s({ mb: "normal", w: "full" })}
        name="purpose"
        label="Purpose"
        placeholder="e.g. December AGM"
        defaultValue={meeting?.purpose}
      />

      <div
        className={classnames(
          styles.dateWrapper,
          s({ w: "full", mb: "large" }),
        )}
      >
        <DateInput
          name="date"
          endDate={meeting?.endDate}
          endPlaceholder="Scheduled End"
          startDate={meeting?.startDate}
          startPlaceholder="Scheduled Start"
          type="range"
        />
      </div>

      <StatusButton
        iconRight={<AddIcon />}
        color="primary"
        style="primary"
        type="submit"
      >
        {meeting ? "Update Meeting" : "Create Meeting"}
      </StatusButton>
    </form>
  );
}
