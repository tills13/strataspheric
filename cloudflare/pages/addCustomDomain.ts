import { ACCOUNT_ID, CF_PAGES_PROJECT_ID } from "../constants";
import { CloudflareApiResponse, makeRequest } from "../makeRequest";

export function addCustomDomain(domainName: string) {
  return makeRequest<CloudflareApiResponse>(
    `/accounts/${ACCOUNT_ID}/pages/projects/${CF_PAGES_PROJECT_ID}/domains`,
    {
      method: "POST",
      body: JSON.stringify({ name: domainName }),
      headers: {
        "content-type": "application/json",
      },
    },
  );
}
