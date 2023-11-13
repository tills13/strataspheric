import { getStrata } from "../../../../data/stratas/getStrata";

export const runtime = "edge";

interface IsDomainAvailableResponseData {
  isAvailable: boolean;
}

export async function GET(req: Request) {
  const u = new URL(req.url!);

  const domain = u.searchParams.get("domain");

  if (!domain) {
    return new Response("Bad Request", { status: 400 });
  }

  const strata = await getStrata(domain);

  // await new Promise((r) => setTimeout(r, 4 * 1000));

  return new Response(
    JSON.stringify({ isAvailable: !strata } as IsDomainAvailableResponseData),
    {
      status: 200,
    }
  );
}
