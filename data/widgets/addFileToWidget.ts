import { prepare } from "../../db";

export function addFileToWidget(widgetId: string, fileId: string) {
  return prepare`INSERT INTO widget_files (widget_id, file_id) VALUES (?, ?)`
    .bind(widgetId, fileId)
    .run();
}
