import { auth } from "../../../../auth";
import { listFiles } from "../../../../data/files/listFiles";
import { getCurrentStrata } from "../../../../data/stratas/getStrataByDomain";

export const runtime = "edge";

export const GET = auth(async (req: Request) => {
  const s = await getCurrentStrata();

  if (!s) {
    return new Response("Not Found", { status: 404 });
  }

  const files = await listFiles(s.id);

  return new Response(JSON.stringify({ files }), {
    headers: {
      "content-type": "application/json",
    },
  });
});
