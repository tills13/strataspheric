import { db, prepare } from "../../db";
import { type Strata } from "../stratas/getStrata";

export async function getWidgets(strata: Strata): Promise<string[]> {
  const result = await prepare`
    SELECT
      strata_widgets.id
    FROM strata_widgets
    WHERE strata_widgets.strata_id = ?
    ORDER BY strata_widgets.id DESC
  `
    .bind(strata.id)
    .all<{ id: string }>();

  if (result.error) {
    console.error(result.error);
    return [];
  }

  return result.results.map((row) => row.id);
}
