import { NewWidgetFile, db } from "..";

export function addFileToWidget(newWidgetFile: NewWidgetFile) {
  return db.insertInto("widget_files").values(newWidgetFile).execute();
}
