import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import { Event, Meeting } from "../../data";
import { classnames } from "../../utils/classnames";
import { patchTimezoneOffset } from "../../utils/datetime";
import { DateInput } from "../DateInput";
import { AddIcon } from "../Icon/AddIcon";
import { Input } from "../Input";
import { Stack } from "../Stack";
import { StatusButton } from "../StatusButton";

interface Props {
  upsertMeeting: (fd: FormData) => Promise<any>;
  meeting?: Meeting & Pick<Event, "startDate" | "endDate">;
}

export function CreateOrUpdateMeetingForm({ upsertMeeting, meeting }: Props) {
  return (
    <form
      action={async (fd) => {
        patchTimezoneOffset(fd, "startDate");
        patchTimezoneOffset(fd, "endDate");

        await upsertMeeting(fd);
      }}
    >
      <Stack>
        <Input
          name="purpose"
          label="Purpose"
          placeholder="e.g. December AGM"
          defaultValue={meeting?.purpose}
        />

        <DateInput
          name="date"
          endDate={meeting?.endDate}
          endPlaceholder="Scheduled End"
          startDate={meeting?.startDate}
          startPlaceholder="Scheduled Start"
          type="range"
        />

        <StatusButton
          iconRight={<AddIcon />}
          color="primary"
          style="primary"
          type="submit"
        >
          {meeting ? "Update Meeting" : "Create Meeting"}
        </StatusButton>
      </Stack>
    </form>
  );
}
