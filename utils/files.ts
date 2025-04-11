import { assetsOrigin } from "../constants";

export function extname(input: string): string {
  return input.split(".").filter(Boolean).pop()!;
}

export function isImageFile(input: string): boolean {
  return ["jpg", "png"].includes(extname(input));
}

export function getImageUri(imagePath: string) {
  if (imagePath[0] !== "/") {
    imagePath = "/" + imagePath;
  }

  return assetsOrigin + imagePath;
}
