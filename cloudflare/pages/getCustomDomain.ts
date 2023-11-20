import { ACCOUNT_ID, CF_PAGES_PROJECT_ID } from "../constants";
import { CloudflareApiResponse, makeRequest } from "../makeRequest";

export type Status = "active" | "pending";

export interface GetCustomDomainData {
  id: string;
  domain_id: string;
  name: string;
  status: Status;
  verification_data: { status: "active" };
  validation_data: { status: Status; method: "http" };
  certificate_authority: "google";
  zone_tag: string;
  created_on: string;
}

export function getCustomDomain(domainName: string) {
  return makeRequest<CloudflareApiResponse<GetCustomDomainData>>(
    `/accounts/${ACCOUNT_ID}/pages/projects/${CF_PAGES_PROJECT_ID}/domains/${domainName}`,
    {
      method: "GET",
    },
  );
}
