import * as styles from "./style.css";

import { Event, Meeting } from "../../data";
import { formatDateForDatetime } from "../../utils/datetime";
import { ElementGroup } from "../ElementGroup";
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
    <form action={createOrUpdateMeeting}>
      <Input
        className={styles.input}
        name="purpose"
        placeholder="Purpose"
        defaultValue={meeting?.purpose}
      />

      <ElementGroup gap="small">
        <Input
          className={styles.input}
          name="startDate"
          placeholder="Scheduled Start"
          type="datetime-local"
          defaultValue={
            meeting?.startDate
              ? formatDateForDatetime(new Date(meeting.startDate))
              : undefined
          }
        />
        <Input
          className={styles.input}
          name="endDate"
          placeholder="Scheduled End"
          type="datetime-local"
          defaultValue={
            meeting?.endDate
              ? formatDateForDatetime(new Date(meeting.endDate))
              : undefined
          }
        />
      </ElementGroup>

      <StatusButton type="submit">
        {meeting ? "Update Meeting" : "Create Meeting"}
      </StatusButton>
    </form>
  );
}
