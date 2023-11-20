import {
  GetCustomDomainData,
  getCustomDomain,
} from "../../../../cloudflare/pages/getCustomDomain";
import { getStrata } from "../../../../db/stratas/getStrata";

export const runtime = "edge";

export interface GetDomainStatusResponseData {
  status: GetCustomDomainData["status"];
}

export async function GET(req: Request) {
  const u = new URL(req.url!);
  const domain = u.searchParams.get("domain");

  if (!domain) {
    return new Response("Bad Request", { status: 400 });
  }

  const strata = await getStrata(domain);

  if (!strata) {
    return new Response("Bad Request", { status: 400 });
  }

  const [json] = await getCustomDomain(domain);

  if (!json.success) {
    return new Response("Not Found", { status: 404 });
  }

  return new Response(
    JSON.stringify({
      status: json.result.status,
    } as GetDomainStatusResponseData),
    {
      status: 200,
    },
  );
}