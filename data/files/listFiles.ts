import { File, db } from "..";

type SortableColumn<M extends Record<string, unknown>> = keyof M extends string
  ? keyof M | `${keyof M} asc` | `${keyof M} desc`
  : never;

export function listFiles(
  strataId: string,
  userId: string | undefined,
  includePrivateFiles: boolean | undefined = true,
  orderBy?: SortableColumn<File>,
): Promise<File[]> {
  let query = db
    .selectFrom("files")
    .selectAll()
    .where("files.strataId", "=", strataId);

  if (!includePrivateFiles) {
    query = query.where((eb) =>
      eb.or([
        eb("files.isPublic", "=", 1),
        ...(userId !== undefined ? [eb("files.uploaderId", "=", userId)] : []),
      ]),
    );
  }

  if (orderBy) {
    query = query.orderBy(orderBy);
  }

  return query.execute();
}
