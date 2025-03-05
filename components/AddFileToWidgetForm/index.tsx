import * as styles from "./style.css";

import { Button } from "../Button";
import { DividerText } from "../DividerText";
import { FileSelect } from "../FileSelect";
import { Input } from "../Input";

interface Props {
  createFile: (fd: FormData) => Promise<void>;
  something: boolean;
}

export function AddFileToWidgetForm({ createFile }: Props) {
  return (
    <form className={styles.addFileToWidgetForm} action={createFile}>
      <Input name="name" label="Name" />
      <Input name="description" label="Description" />
      <Input name="file" type="file" />
      <DividerText>OR</DividerText>
      <FileSelect name="existing_file" />
      <Button type="submit">Create</Button>
    </form>
  );
}
