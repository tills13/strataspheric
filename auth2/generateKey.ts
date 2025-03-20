import * as crypto from "node:crypto";

(async () => {
  const key = await crypto.subtle.generateKey(
    { name: "HMAC", hash: { name: "SHA-256" } },
    true,
    ["sign", "verify"],
  );

  const keyData = await crypto.subtle.exportKey("jwk", key);
  console.log(JSON.stringify(keyData));
})();
