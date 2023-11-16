import { CF_AUTH_EMAIL, CF_AUTH_KEY } from "./constants";

export type CloudflareApiResponse<T = unknown> =
  | {
      errors: [];
      messages: [];
      result: T;
      success: true;
    }
  | {
      errors: [];
      messages: [];
      result: null;
      success: false;
    };

export async function makeRequest<T>(
  endpoint: string,
  init: RequestInit
): Promise<[T, Response]> {
  const r = await fetch("https://api.cloudflare.com/client/v4" + endpoint, {
    ...init,
    headers: {
      ...{
        "x-auth-key": CF_AUTH_KEY,
        "x-auth-email": CF_AUTH_EMAIL,
      },
      ...(init.body && {
        "content-type": "application/json",
      }),
      ...init.headers,
    },
  });

  const json = (await r.json()) as unknown as T;

  return [json, r];
}
