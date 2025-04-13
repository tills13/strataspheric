import { File, db } from "..";
import { Pagination } from "../types";

type ListFilesFilter = {
  strataId?: string;
  userId?: string;
  fileTypes?: string[];
  isPublic?: boolean;
};

type ListFilesPagination = Pagination<"files", File>;

export function listFiles(
  filters: ListFilesFilter,
  pagination?: ListFilesPagination,
): Promise<File[]> {
  let query = db.selectFrom("files").selectAll();

  if (filters.strataId) {
    query = query.where("files.strataId", "=", filters.strataId);
  }

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
