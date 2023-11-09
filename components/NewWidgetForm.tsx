import { createWidget } from "../data/widgets/createWidget";

interface Props {
  strataId: string;
}

export function NewWidgetForm({ strataId }: Props) {
  return (
    <form action={createWidget}>
      <input name="strata_id" type="hidden" defaultValue={strataId} />
      <input name="title" type="title" placeholder="Title" />

      <select name="type" defaultValue="file">
        <option value="file">Files</option>
        <option value="event">Events</option>
      </select>

      <button>Create Widget</button>
    </form>
  );
}
