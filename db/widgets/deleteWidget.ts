import { db } from "..";
import { auth } from "../../auth";
import { assertCan } from "../users/permissions";

export async function deleteWidget(widgetId: string) {
  assertCan((await auth())?.user, "stratas.widgets.delete");

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
