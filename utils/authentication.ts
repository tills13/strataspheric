export async function pbkdf2(password: string, iterations = 1e5) {
  const pwUtf8 = new TextEncoder().encode(password);
  const pwKey = await crypto.subtle.importKey("raw", pwUtf8, "PBKDF2", false, [
    "deriveBits",
  ]);

  const salt = crypto.getRandomValues(new Uint8Array(16));

  const keyBuffer = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt,
      iterations,
    },
    pwKey,
    256,
  );

  const keyArray = Array.from(new Uint8Array(keyBuffer));
  const saltArray = Array.from(new Uint8Array(salt));

  const iterHex = ("000000" + iterations.toString(16)).slice(-6);

  const iterArray: number[] = [];

  for (let i = 0; i < iterHex.length; i += 2) {
    const byte = iterHex.substring(i, i + 2);
    iterArray.push(parseInt(byte, 16));
  }

  const compositeStr = [...saltArray, ...iterArray, ...keyArray]
    .map((byte) => String.fromCharCode(byte))
    .join("");

  return btoa("v01" + compositeStr);
}

export async function pbkdf2Verify(
  hashedPassword: string,
  suppliedPassword: string,
) {
  let compositeStr: string;

  try {
    compositeStr = atob(hashedPassword);
  } catch (e) {
    throw new Error("Invalid key");
  }

  const version = compositeStr.slice(0, 3);
  const saltStr = compositeStr.slice(3, 19);
  const iterStr = compositeStr.slice(19, 22);
  const keyStr = compositeStr.slice(22, 54);

  if (version != "v01") {
    throw new Error("Invalid key");
  }

  const saltUint8 = new Uint8Array(
    saltStr.split("").map((ch) => ch.charCodeAt(0)),
  );

  const iterHex = iterStr
    .split("")
    .map((ch) => ch.charCodeAt(0).toString(16))
    .join("");
  const iterations = parseInt(iterHex, 16);

  const pwUtf8 = new TextEncoder().encode(suppliedPassword);
  const pwKey = await crypto.subtle.importKey("raw", pwUtf8, "PBKDF2", false, [
    "deriveBits",
  ]);

  const keyBuffer = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt: saltUint8,
      iterations: iterations,
    },
    pwKey,
    256,
  );
  const keyArray = Array.from(new Uint8Array(keyBuffer));
  const keyStrNew = keyArray.map((byte) => String.fromCharCode(byte)).join("");

  return keyStrNew === keyStr;
}
