import { cache } from "react";

import { Strata, db } from "..";

export const getUserStratas = cache((userId: string): Promise<Strata[]> => {
  return db
    .selectFrom("stratas")
    .selectAll()
    .where("stratas.id", "in", (eb) =>
      eb
        .selectFrom("strata_memberships")
        .select("strataId")
        .where("strata_memberships.userId", "=", userId),
    )
    .execute();
});
