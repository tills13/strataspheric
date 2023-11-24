import { db } from "..";

export function deleteFileFromWidget(widgetId: string, fileId: string) {
  return db
    .deleteFrom("widget_files")
    .where("widget_files.fileId", "=", fileId)
    .where("widget_files.widgetId", "=", widgetId)
    .execute();
}
