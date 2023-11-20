import { StrataWidget, db } from "..";

export async function getWidget(widgetId: string): Promise<StrataWidget> {
  return db
    .selectFrom("strata_widgets")
    .selectAll()
    .where("strata_widgets.id", "=", widgetId)
    .executeTakeFirstOrThrow();
}
