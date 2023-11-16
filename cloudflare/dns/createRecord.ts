import { ZONE_ID } from "../constants";
import { CloudflareApiResponse, makeRequest } from "../makeRequest";

type CreateRecordResponse = CloudflareApiResponse<{
  id: string;
}>;

export function createRecord(type: "CNAME", name: string, content: string) {
  return makeRequest<CreateRecordResponse>(`/zones/${ZONE_ID}/dns_records`, {
    method: "POST",
    body: JSON.stringify({
      type,
      name,
      content,
      proxied: true,
    }),
  });
}
