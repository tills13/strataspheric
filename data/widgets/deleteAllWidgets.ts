import { db } from "..";

export async function deleteAllWidgets(strataId: string) {
  return db.transaction().execute(async (t) => {
    await t
      .deleteFrom("widget_events")
      .where("widget_events.widgetId", "in", (eb) =>
        eb
          .selectFrom("strata_widgets")
          .select("strata_widgets.id")
          .where("strata_widgets.strataId", "=", strataId),
      )
      .execute();

    await t
      .deleteFrom("widget_files")
      .where("widget_files.widgetId", "in", (eb) =>
        eb
          .selectFrom("strata_widgets")
          .select("strata_widgets.id")
          .where("strata_widgets.strataId", "=", strataId),
      )
      .execute();

    await t
      .deleteFrom("strata_widgets")
      .where("strata_widgets.strataId", "=", strataId)
      .execute();

    return t;
  });
}
