import { File, db } from "..";
import { Pagination, SortableColumn } from "../types";

type ListFilesFilter = {
  userId?: string;
  fileTypes?: string[];
  isPublic?: boolean;
};

type ListFilesPagination = Pagination<"files", File>;

export function listFiles(
  strataId: string,
  filters: ListFilesFilter,
  pagination?: ListFilesPagination,
): Promise<File[]> {
  let query = db
    .selectFrom("files")
    .selectAll()
    .where("files.strataId", "=", strataId);

  if (filters.isPublic) {
    query = query.where((eb) =>
      eb.or([
        eb("files.isPublic", "=", 1),
        ...(filters.userId !== undefined
          ? [eb("files.uploaderId", "=", filters.userId)]
          : []),
      ]),
    );
  }

  if (filters.fileTypes) {
    query = query.where("files.mimeType", "in", filters.fileTypes);
  }

  if (pagination?.orderBy) {
    query = query.orderBy(pagination.orderBy);
  }

  return query.execute();
}
