import { type Widget } from ".";
import { db, prepare } from "../../db";

export async function getWidget(widgetId: string): Promise<Widget | null> {
  return prepare`
    SELECT
      strata_widgets.id,
      strata_widgets.strata_id AS strataId,
      strata_widgets.title,
      strata_widgets.type
    FROM strata_widgets
    WHERE strata_widgets.id = ?
  `
    .bind(widgetId)
    .first<Widget>();
}
