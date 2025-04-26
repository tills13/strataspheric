"use client";

import * as styles from "./style.css";

import React, { useState } from "react";

import { signIn } from "../../auth/actions";
import { protocol, tld } from "../../constants";
import { classnames } from "../../utils/classnames";
import * as formdata from "../../utils/formdata";
import { Button } from "../Button";
import { Input } from "../Input";
import { ExternalLink } from "../Link/ExternalLink";
import { Stack } from "../Stack";
import { StatusButton } from "../StatusButton";
import { Text } from "../Text";

interface Props {
  className?: string;
}

export function SignInForm({ className }: Props) {
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    setError(undefined);

    try {
      const result = await signIn(
        formdata.getString(fd, "email"),
        formdata.getString(fd, "password"),
      );

      if (!result || result.error) {
        setError(result.error);
        return;
      }

      location.href = "/";
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className={classnames(className)} onSubmit={onSubmit}>
      <Stack>
        <Input
          className={styles.signInFormInput}
          id="email"
          name="email"
          type="email"
          label="Email"
        />

        <Input
          className={styles.signInFormInput}
          id="password"
          name="password"
          type="password"
          label="Password"
        />

        {error && (
          <Text color="error" textAlign="center">
            {error}
          </Text>
        )}

        <StatusButton color="primary" type="submit" isPending={loading}>
          Sign in
        </StatusButton>

        <ExternalLink
          className={styles.forgotLink}
          href={protocol + "//" + tld + "/forgot"}
        >
          <Button style="tertiary" color="primary" type="button">
            Forgot Password
          </Button>
        </ExternalLink>
      </Stack>
    </form>
  );
}
