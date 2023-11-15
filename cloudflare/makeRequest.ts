const AUTH_HEADERS = {
  "x-auth-key": process.env.CF_AUTH_KEY!,
  "x-auth-email": process.env.CF_AUTH_EMAIL!,
};

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

// export interface CloudflareApiResponse<T = unknown> {
//   errors: [];
//   messages: [];
//   result: T | null;
//   success: boolean;
// }

export async function makeRequest<T>(
  endpoint: string,
  init: RequestInit
): Promise<[T, Response]> {
  const r = await fetch("https://api.cloudflare.com/client/v4" + endpoint, {
    ...init,
    headers: {
      ...AUTH_HEADERS,
      ...(init.body && {
        "content-type": "application/json",
      }),
      ...init.headers,
    },
  });

  const json = (await r.json()) as unknown as T;

  return [json, r];
}
