import { NextResponse } from "next/server";

import {
  GetCustomDomainData,
  getCustomDomain,
} from "../../../../cloudflare/pages/getCustomDomain";
import { getStrataByDomain } from "../../../../data/stratas/getStrataByDomain";

export const runtime = "edge";

export interface GetDomainStatusResponseData {
  status: GetCustomDomainData["status"];
}

export async function GET(req: Request) {
  const u = new URL(req.url);
  const domain = u.searchParams.get("domain");

  if (!domain) {
    return new Response("Bad Request", { status: 400 });
  }

  const strata = await getStrataByDomain(domain);

  if (!strata) {
    return new Response("Bad Request", { status: 400 });
  }

  if (process.env.NODE_ENV === "development") {
    return new Response(
      JSON.stringify({
        status: "active",
      } as GetDomainStatusResponseData),
      {
        status: 200,
        headers: {
          "content-type": "application/json",
        },
      },
    );
  }

  const [json] = await getCustomDomain(domain);

  if (!json.success) {
    return new Response("Not Found", { status: 404 });
  }

  return NextResponse.json({
    status: json.result.status,
  } satisfies GetDomainStatusResponseData);
}
