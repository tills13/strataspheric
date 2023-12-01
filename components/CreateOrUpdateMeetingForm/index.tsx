import * as styles from "./style.css";

import { Meeting } from "../../data";
import { FormSubmitStatusButton } from "../FormSubmitStatusButton";
import { Input } from "../Input";

interface Props {
  createOrUpdateMeeting: (fd: FormData) => void;
  meeting?: Meeting;
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
      <Input
        className={styles.input}
        name="date"
        placeholder="Date"
        type="date"
        defaultValue={meeting?.date}
      />

      <FormSubmitStatusButton type="submit">
        {meeting ? "Update Meeting" : "Create Meeting"}
      </FormSubmitStatusButton>
    </form>
  );
}
