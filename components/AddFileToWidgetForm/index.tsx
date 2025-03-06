import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import { DividerText } from "../DividerText";
import { FileSelect } from "../FileSelect";
import { AddIcon } from "../Icon/AddIcon";
import { Input } from "../Input";
import { Stack } from "../Stack";
import { StatusButton } from "../StatusButton";

interface Props {
  createFile: (fd: FormData) => Promise<void>;
}

export function AddFileToWidgetForm({ createFile }: Props) {
  return (
    <form className={styles.addFileToWidgetForm} action={createFile}>
      <Stack>
        <Input name="name" label="Name" />
        <Input name="description" label="Description" />
        <Input name="file" type="file" />
      </Stack>
      <DividerText className={s({ mv: "large" })}>OR</DividerText>
      <FileSelect
        className={s({ mb: "large" })}
        name="existing_file"
        placeholder="Attach Existing File"
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
