import { NextRequest } from "next/server";

import { r2 } from "../../../../../data/r2";

export const runtime = "edge";

export const GET = async (req: NextRequest) => {
  const segments = req.nextUrl.searchParams.getAll("segments");
  const response = await r2.get(segments.join("/"));

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
