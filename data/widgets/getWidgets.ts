import { StrataWidget, db } from "..";

export async function getWidgets(strataId: string): Promise<StrataWidget[]> {
  return db
    .selectFrom("strata_widgets")
    .selectAll()
    .where("strata_widgets.strataId", "=", strataId)
    .orderBy("strata_widgets.id desc")
    .execute();
}
