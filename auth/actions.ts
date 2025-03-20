export async function signIn(email: string, password: string) {
  const body = new FormData();
  body.set("email", email);
  body.set("password", password);

  const response = await fetch("/api/session/create", {
    method: "POST",
    body,
  });

  // todo error handling
  return response.json();
}

export async function signOut() {
  await fetch("/api/session/destroy", { method: "POST" });
}
