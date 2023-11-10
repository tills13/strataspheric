import { auth } from "../../auth";
import { db } from "../../db";
import { assertCan } from "../members/permissions";

export async function deleteWidget(widgetId: string) {
  assertCan((await auth())?.user, "stratas.widgets.delete");

  await db()
    .prepare(`DELETE FROM strata_widgets WHERE id = ?`)
    .bind(widgetId)
    .run();

  await Promise.all([
    db().prepare(`DELETE FROM files WHERE widget_id = ?`).bind(widgetId).run(),
    db().prepare(`DELETE FROM events WHERE widget_id = ?`).bind(widgetId).run(),
  ]);
}
