const AUTH_EMAIL = "tills13@gmail.com";
const AUTH_KEY = "5891553ba4bdedfe360acfc47e1723753067e";

const ACCOUNT_ID = "8d89f3928f99f4b426c6299b292dedbe";
const ZONE_ID = "a87302420e3e13d13ae08afad0776ff7";

const handlerScriptPartial = `
addEventListener("fetch", (event) => event.respondWith(handler(event.request)));
`;

export function makeWorkerScript(baseScript: string) {
    return (
        "function handler(request) { " +
        baseScript +
        " }\n\n" +
        handlerScriptPartial
    );
}

const AUTH_HEADERS = {
    "x-auth-key": AUTH_KEY,
    "x-auth-email": AUTH_EMAIL,
};

interface CloudflareApiResponse<T> {
    errors: [];
    messages: [];
    result: T;
    success: boolean;
}

async function makeRequest<T>(
    endpoint: string,
    init: RequestInit,
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

type CreateDnsRecordResponse = CloudflareApiResponse<{
    id: string;
}>;

export function createDnsRecord(type: "CNAME", name: string, content: string) {
    return makeRequest<CreateDnsRecordResponse>(
        `/zones/${ZONE_ID}/dns_records`,
        {
            method: "POST",
            body: JSON.stringify({
                type,
                name,
                content,
                proxied: true,
            }),
        },
    );
}

export function updateDnsRecord(
    dnsRecordId: string,
    type: "CNAME",
    name: string,
    content: string,
) {
    return makeRequest<CreateDnsRecordResponse>(
        `/zones/${ZONE_ID}/dns_records/${dnsRecordId}`,
        {
            method: "PUT",
            body: JSON.stringify({
                type,
                name,
                content,
                proxied: true,
            }),
        },
    );
}

type CreateOrUpdateWorkerScriptResponse = CloudflareApiResponse<{
    id: string;
}>;

export function createOrUpdateWorkerScript(
    scriptName: string,
    scriptContent: string,
) {
    return makeRequest<CreateOrUpdateWorkerScriptResponse>(
        `/accounts/${ACCOUNT_ID}/workers/scripts/${scriptName}`,
        {
            method: "PUT",
            body: scriptContent,
            headers: {
                "content-type": "application/javascript",
            },
        },
    );
}

type AddWorkerRouteResonse = CloudflareApiResponse<{
    id: string;
    pattern: string;
    script: string;
    request_limit_fail_open: boolean;
}>;

export function addWorkerRoute(script: string, pattern: string) {
    return makeRequest<AddWorkerRouteResonse>(
        `/zones/${ZONE_ID}/workers/routes`,
        {
            body: JSON.stringify({ script, pattern }),
            method: "POST",
        },
    );
}
