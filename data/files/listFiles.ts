import { File as DBFile, db } from "..";
import { Pagination } from "../types";
import { File } from "./getFile";

type ListFilesFilter = {
  fileTypes?: string[];
  isPublic?: boolean;
  searchTerm?: string;
  strataId?: string;
  userId?: string;
};

type ListFilesPagination = Pagination<"files", DBFile>;

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

  if (filters.searchTerm) {
    query = query.where((eb) =>
      eb.or([
        eb("name", "like", `%${filters.searchTerm}%`),
        eb("description", "like", `%${filters.searchTerm}%`),
      ]),
    );
  }

  if (filters.fileTypes) {
    query = query.where("files.mimeType", "in", filters.fileTypes);
  }

  if (pagination?.orderBy) {
    query = query.orderBy([pagination.orderBy]);
  }

  return query.execute();
}
