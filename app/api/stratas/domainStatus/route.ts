import { NextResponse } from "next/server";

import { getCustomDomain } from "../../../../cloudflare/workers/getCustomDomain";
import { getStrataByDomain } from "../../../../data/stratas/getStrataByDomain";

export interface GetDomainStatusResponseData {
  status: "active" | "pending";
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
    return NextResponse.json({
      status: "active",
    } satisfies GetDomainStatusResponseData);
  }

  if (!strata.domainRecordId) {
    return NextResponse.json({
      status: "pending",
    } satisfies GetDomainStatusResponseData);
  }

  const [json] = await getCustomDomain(strata.domainRecordId);

  if (!json.success) {
    return NextResponse.json({
      status: "pending",
    } satisfies GetDomainStatusResponseData);
  }

  return NextResponse.json({
    status: "active",
  } satisfies GetDomainStatusResponseData);
}
