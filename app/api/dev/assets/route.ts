import { NextRequest } from "next/server";

import { r2 } from "../../../../data/r2";

export const GET = async (req: NextRequest) => {
  let key = req.nextUrl.searchParams.get("key");

  if (!key) {
    return new Response("Bad Request", { status: 400 });
  }

  if (key.startsWith("/")) {
    key = key.substring(1);
  }

  const response = await r2().get(key);

  if (!response) {
    return new Response("Not Found", { status: 404 });
  }

  const contentType =
    response.httpMetadata?.contentType ||
    response.customMetadata?.["Content-Type"];

  return new Response(await response.arrayBuffer(), {
    headers: contentType ? { "Content-Type": contentType } : {},
  });
};
