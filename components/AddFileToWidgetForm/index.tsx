import * as styles from "./style.css";

import { upsertFileWidgetFileAction } from "../../app/@app/dashboard/actions";
import { DividerText } from "../DividerText";
import { FileSelect } from "../FileSelect";
import { AddIcon } from "../Icon/AddIcon";
import { Input } from "../Input";
import { Stack } from "../Stack";
import { StatusButton } from "../StatusButton";
import { TextArea } from "../TextArea";

interface Props {
  strataId: string;
  widgetId: string;
}

export function AddFileToWidgetForm({ strataId, widgetId }: Props) {
  return (
    <form
      className={styles.addFileToWidgetForm}
      action={upsertFileWidgetFileAction.bind(undefined, strataId, widgetId)}
    >
      <Stack>
        <Input name="name" label="Name" placeholder="e.g. AGM Minutes" />
        <TextArea
          name="description"
          label="Description"
          placeholder="Description"
        />
        <Input name="file" label="Upload File" type="file" />
        <DividerText>OR</DividerText>
        <FileSelect label="Attach Existing File" name="existing_file" />
        <StatusButton
          color="primary"
          iconRight={<AddIcon />}
          style="primary"
          type="submit"
        >
          Add File
        </StatusButton>
      </Stack>
    </form>
  );
}
