import { upsertMeetingAction } from "../../app/@app/dashboard/meetings/actions";
import { Event, Meeting } from "../../data";
import { patchTimezoneOffset } from "../../utils/datetime";
import { DateInput } from "../DateInput";
import { AddIcon } from "../Icon/AddIcon";
import { Input } from "../Input";
import { Stack } from "../Stack";
import { StatusButton } from "../StatusButton";

interface Props {
  meeting?: Meeting & Pick<Event, "startDate" | "endDate">;
}

export function CreateOrUpdateMeetingForm({ meeting }: Props) {
  return (
    <form
      action={async (fd) => {
        patchTimezoneOffset(fd, "startDate");
        patchTimezoneOffset(fd, "endDate");

        await upsertMeetingAction(meeting?.id, fd);
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
          defaultEndValue={meeting?.endDate}
          endPlaceholder="Scheduled End"
          defaultStartValue={meeting?.startDate}
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
