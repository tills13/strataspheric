import * as styles from "./style.css";

import { Button } from "../Button";
import { ElementGroup } from "../ElementGroup";
import { Input } from "../Input";

interface Props {
  createFile: (fd: FormData) => void;
  widgetId: string;
}

export function NewFileForm({ createFile, widgetId }: Props) {
  return (
    <form className={styles.newFileForm} action={createFile}>
      <input name="widget_id" type="hidden" defaultValue={widgetId} />
      <Input name="name" placeholder="Name" />
      <Input name="description" placeholder="Description" />
      <Input name="file" type="file" />
      <Button type="submit">Create</Button>
    </form>
  );
}
