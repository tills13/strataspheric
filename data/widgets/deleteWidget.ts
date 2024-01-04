import { db } from "..";

export async function deleteWidget(widgetId: string) {
  return db.transaction().execute(async (t) => {
    await t
      .deleteFrom("widget_events")
      .where("widget_events.widgetId", "=", widgetId)
      .execute();

    await t
      .deleteFrom("widget_files")
      .where("widget_files.widgetId", "=", widgetId)
      .execute();

    await t.deleteFrom("strata_widgets").where("id", "=", widgetId).execute();

    return t;
  });
}
