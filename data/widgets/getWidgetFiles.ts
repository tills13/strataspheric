import { prepare } from "../../db";
import { File } from "../files";

export async function getWidgetFiles(
  widgetId: string,
  limit: number,
  offset: number
) {
  const result = await prepare`
        SELECT 
            files.id,
            files.name,
            files.description,
            files.path,
            files.created_at AS createdAt
        FROM widget_files
        LEFT JOIN files ON widget_files.file_id = files.id
        WHERE widget_id = ?
        ORDER BY created_at DESC
        LIMIT ?
        OFFSET ?
    `
    .bind(widgetId, limit, offset)
    .all<File>();

  return result.results;
}
