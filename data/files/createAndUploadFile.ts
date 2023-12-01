import { uuidv7 } from "uuidv7";

import { File as IFile } from "..";
import { extname } from "../../utils/extname";
import { r2 } from "../r2";
import { createFile } from "./createFile";

export async function createAndUpdloadFile(
  strataId: string,
  uploaderId: string | null,
  fileName: string,
  fileDescription: string,
  filePath: string,
  file: File,
  isPublic?: boolean,
): Promise<IFile> {
  const extension = extname(filePath);

  const key =
    strataId + "/" + Buffer.from(uuidv7()).toString("base64") + "." + extension;

  await r2.put(key, file as any);

  return createFile({
    name: fileName,
    description: fileDescription,
    path: "/" + key,
    strataId,
    uploaderId,
    isPublic: isPublic ? 1 : 0,
  });
}
