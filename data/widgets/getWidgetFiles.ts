import { File, db } from "..";

export async function getWidgetFiles(
  widgetId: string,
  limit: number,
  offset: number,
): Promise<File[]> {
  return db
    .selectFrom("files")
    .selectAll("files")
    .innerJoin("widget_files", "files.id", "widget_files.fileId")
    .where("widget_files.widgetId", "=", widgetId)
    .limit(limit)
    .offset(offset)
    .execute();
}
