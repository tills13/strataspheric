export async function signIn(
  email: string,
  password: string,
): Promise<{ error?: string; result?: unknown }> {
  const body = new FormData();
  body.set("email", email);
  body.set("password", password);

  try {
    const response = await fetch("/api/session/create", {
      method: "POST",
      body,
    });

    return (await response.json()) as { error?: string; result?: unknown };
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : `${e}`,
    };
  }
}

export async function signOut() {
  await fetch("/api/session/destroy", { method: "POST" });
}
