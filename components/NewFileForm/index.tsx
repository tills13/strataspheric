import * as styles from "./style.css";

import { Button } from "../Button";
import { Input } from "../Input";

interface Props {
  createFile: (fd: FormData) => void;
}

export function NewFileForm({ createFile }: Props) {
  return (
    <form className={styles.newFileForm} action={createFile}>
      <Input name="name" placeholder="Name" />
      <Input name="description" placeholder="Description" />
      <Input name="file" type="file" />
      <Button type="submit">Create</Button>
    </form>
  );
}
