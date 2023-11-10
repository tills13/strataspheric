"use client";

import React, { useState } from "react";
import { classnames } from "../../utils/classnames";
import { Button } from "../Button";
import { Input } from "../Input";
import * as styles from "./style.css";

import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

interface Props {
  className?: string;
}

export function SignInForm({ className }: Props) {
  const [error, setHasError] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    setHasError(false);

    const result = await signIn("credentials", {
      email: fd.get("email"),
      password: fd.get("password"),
      redirect: false,
    });

    if (!result || result.error) {
      setHasError(true);
    }

    if (result?.ok && result.url) {
      window.location.href = result.url;
    }
  }

  return (
    <form
      className={classnames(className, styles.signInForm)}
      onSubmit={onSubmit}
    >
      <Input
        className={styles.signInFormInput}
        id="email"
        name="email"
        type="email"
        placeholder="Email"
      />

      <Input
        className={styles.signInFormInput}
        id="password"
        name="password"
        type="password"
        placeholder="Password"
      />

      {error && <div>Incorrect username or password</div>}

      <Button type="submit">Sign in</Button>
    </form>
  );
}
