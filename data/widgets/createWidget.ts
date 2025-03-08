import { uuidv7 } from "uuidv7";

import { NewStrataWidget, db } from "..";

export function createWidget(newWidget: Omit<NewStrataWidget, "id">) {
  return db
    .insertInto("strata_widgets")
    .values({ id: uuidv7(), ...newWidget })
    .returning("strata_widgets.id")
    .executeTakeFirstOrThrow();
}
