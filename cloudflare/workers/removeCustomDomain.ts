import { ACCOUNT_ID } from "../constants";
import { CloudflareApiResponse, makeRequest } from "../makeRequest";

export function removeCustomDomain(domainId: string) {
  return makeRequest<CloudflareApiResponse>(
    `/accounts/${ACCOUNT_ID}/workers/domains/${domainId}`,
    { method: "DELETE" },
  );
}
