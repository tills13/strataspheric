import * as styles from "./style.css";

import { Button } from "../Button";
import { Checkbox } from "../Checkbox";
import { Header } from "../Header";
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
      <label className={styles.isPublicWrapper} htmlFor="isPublic">
        <Header priority={3}>File is public</Header>
        <Checkbox id="isPublic" name="isPublic" defaultChecked={false} />
      </label>
      <Button type="submit">Create</Button>
    </form>
  );
}
