import { SelectQueryBuilder } from "kysely";
import {
  AllSelection,
  SelectExpression,
  Selection,
} from "kysely/dist/cjs/parser/select-parser";
import { ExtractTableAlias } from "kysely/dist/cjs/parser/table-parser";
import {
  AnyAliasedColumnWithTable,
  ExtractColumnType,
} from "kysely/dist/cjs/util/type-utils";

import { Database, db } from "..";

export type File = Awaited<ReturnType<typeof getFile>>;

const joinFilesColumns = [
  "files.createdAt as fileCreatedAt",
  "files.description as fileDescription",
  "files.id as fileId",
  "files.isPublic as fileIsPublic",
  "files.name as fileName",
  "files.path as filePath",
  "files.sizeBytes as fileSizeBytes",
  "files.strataId as fileStrataId",
  "files.uploaderId as fileUploaderId",
  "files.mimeType as fileMimeType",
] satisfies SelectExpression<Database, "files">[];

type JoinFilesColumns = Selection<
  Database,
  "files",
  (typeof joinFilesColumns)[number]
>;

function receiveJoinFiles(row: JoinFilesColumns) {
  if (!row.fileId) {
    return undefined;
  }

  return {
    createdAt: row.fileCreatedAt,
    description: row.fileDescription,
    id: row.fileId,
    isPublic: row.fileIsPublic,
    name: row.fileName,
    path: row.filePath,
    sizeBytes: row.fileSizeBytes,
    strataId: row.fileStrataId,
    uploaderId: row.fileUploaderId,
    mimeType: row.fileMimeType,
  } satisfies File as File;
}

export async function getFile(fileId: string) {
  return db
    .selectFrom("files")
    .selectAll()
    .where("files.id", "=", fileId)
    .executeTakeFirstOrThrow();
}
