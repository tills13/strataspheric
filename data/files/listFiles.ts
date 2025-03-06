import { File, db } from "..";

type SortableColumn<M extends Record<string, unknown>> = keyof M extends string
  ? keyof M | `${keyof M} asc` | `${keyof M} desc`
  : never;
type X = SortableColumn<File>;

export function listFiles(
  strataId: string,
  includePrivateFiles: boolean | undefined = true,
  orderBy?: SortableColumn<File>,
): Promise<File[]> {
  let query = db
    .selectFrom("files")
    .selectAll()
    .where("files.strataId", "=", strataId);

  if (!includePrivateFiles) {
    query = query.where("files.isPublic", "=", 1);
  }

  if (orderBy) {
    query = query.orderBy(orderBy);
  }

  return query.execute();
}
