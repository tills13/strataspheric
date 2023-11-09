import { createFile } from "../data/files/createFile";
import { type FileWidget as IFileWidget } from "../data/widgets";

interface Props {
  widget: IFileWidget;
}

export function FileWidget({ widget }: Props) {
  return (
    <div>
      <h3>{widget.title}</h3>
      <div>
        {widget.files.map((file) => (
          <div key={file.id}>
            <h4>{file.name}</h4>
            <span suppressHydrationWarning>
              {file.createdAt.toLocaleDateString()}
            </span>
            <a href={file.path} target="_blank">
              Download
            </a>
          </div>
        ))}
      </div>

      <div>
        <h5>Add File to {widget.title}</h5>
        <form action={createFile}>
          <input name="widget_id" type="hidden" defaultValue={widget.id} />
          <input name="name" placeholder="Name" />
          <input name="file" type="file" />
          <button type="submit">Add File</button>
        </form>
      </div>
    </div>
  );
}
