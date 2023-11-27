import { uuidv7 } from "uuidv7";

import { File } from "..";
import { extname } from "../../utils/extname";
import { r2 } from "../r2";
import { createFile } from "./createFile";

export async function createAndUpdloadFile(
  strataId: string,
  fileName: string,
  fileDescription: string,
  filePath: string,
  file: any,
): Promise<File> {
  const extension = extname(filePath);

  const key =
    strataId + "/" + Buffer.from(uuidv7()).toString("base64") + "." + extension;

  await r2.put(key, file);

  return createFile({
    name: fileName,
    description: fileDescription,
    path: "/" + key,
    strataId,
    isPublic: 1,
  });
}
