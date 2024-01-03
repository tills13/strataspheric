"use client";

import * as styles from "./style.css";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { protocol, tld } from "../../constants";
import { classnames } from "../../utils/classnames";
import { Button } from "../Button";
import { Input } from "../Input";
import { ExternalLink } from "../Link/ExternalLink";

interface Props {
  className?: string;
}

export function SignInForm({ className }: Props) {
  const [error, setHasError] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    setHasError(false);

    const result = await signIn("credentials", {
      email: fd.get("email"),
      password: fd.get("password"),
      redirect: false,
      // callbackUrl: "/dashboard",
    });

    if (!result || result.error) {
      setHasError(true);
      return;
    }

    location.href = "/";
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

      <Button color="primary" type="submit">
        Sign in
      </Button>

      <ExternalLink
        className={styles.forgotLink}
        href={protocol + "//" + tld + "/forgot"}
      >
        <Button style="tertiary" type="button">
          Forgot Password
        </Button>
      </ExternalLink>
    </form>
  );
}
