import { NewWidgetInfo, db } from "..";

export function createWidgetInfo(newWidgetInfo: NewWidgetInfo) {
  return db
    .insertInto("widget_info")
    .values({ ...newWidgetInfo })
    .execute();
}
