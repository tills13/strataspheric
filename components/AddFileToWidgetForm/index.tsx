import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import { DividerText } from "../DividerText";
import { FileSelect } from "../FileSelect";
import { AddIcon } from "../Icon/AddIcon";
import { Input } from "../Input";
import { Stack } from "../Stack";
import { StatusButton } from "../StatusButton";
import { TextArea } from "../TextArea";

interface Props {
  createFile: (fd: FormData) => Promise<void>;
}

export function AddFileToWidgetForm({ createFile }: Props) {
  return (
    <form className={styles.addFileToWidgetForm} action={createFile}>
      <Stack>
        <Input name="name" label="Name" placeholder="e.g. AGM Minutes" />
        <TextArea
          name="description"
          label="Description"
          placeholder="Description"
        />
        <Input name="file" label="Upload File" type="file" />
      </Stack>
      <DividerText className={s({ mv: "large" })}>OR</DividerText>
      <FileSelect
        className={s({ mb: "large" })}
        label="Attach Existing File"
        name="existing_file"
      />
      <StatusButton
        color="primary"
        iconRight={<AddIcon />}
        style="primary"
        type="submit"
      >
        Add File
      </StatusButton>
    </form>
  );
}
