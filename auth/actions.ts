export async function signIn(email: string, password: string) {
  const body = new FormData();
  body.set("email", email);
  body.set("password", password);

  try {
    const response = await fetch("/api/session/create", {
      method: "POST",
      body,
    });

    return response.json();
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : `${e}`,
    };
  }
}

export async function signOut() {
  await fetch("/api/session/destroy", { method: "POST" });
}
