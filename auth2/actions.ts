export async function signIn(email: string, password: string) {
  const endpoint = "/api/session/create";

  const body = new FormData();
  body.set("email", email);
  body.set("password", password);

  const response = await fetch(endpoint, {
    method: "POST",
    body,
  });

  return {};
}
export async function signOut() {}
