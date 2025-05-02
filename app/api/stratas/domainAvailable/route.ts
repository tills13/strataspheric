import { NextResponse } from "next/server";

import { getStrataByDomain } from "../../../../data/stratas/getStrataByDomain";

export const runtime = "edge";

interface IsDomainAvailableResponseData {
  isAvailable: boolean;
}

export async function GET(req: Request) {
  const u = new URL(req.url);

  const domain = u.searchParams.get("domain");

  if (!domain) {
    return new Response("Bad Request", { status: 400 });
  }

  const strata = await getStrataByDomain(domain);

  return NextResponse.json({
    isAvailable: !strata,
  } satisfies IsDomainAvailableResponseData);
}
