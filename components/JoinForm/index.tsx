"use client";

import * as styles from "./style.css";

import { signIn } from "next-auth/react";
import React from "react";
import { useFormState } from "react-dom";

import { type JoinFormState } from "../../app/@marketing/(marketing)/(static)/join/actions";
import { classnames } from "../../utils/classnames";
import { Checkbox } from "../Checkbox";
import { StatusButton } from "../StatusButton";
import { JoinFormFields } from "./JoinFormFields";

interface Props {
  className?: string;
  onSubmit: (state: JoinFormState, fd: FormData) => Promise<JoinFormState>;
}

export function JoinForm({ className, onSubmit }: Props) {
  const [state, wrappedOnSubmit] = useFormState(
    async (state: JoinFormState, fd: FormData) => {
      const nextState = await onSubmit(state, fd);

      if (nextState?.success) {
        await signIn("credentials", {
          email: fd.get("email"),
          password: fd.get("password"),
          redirect: false,
        });

        location.href = "/";
      }

      return nextState;
    },
    null,
  );

  return (
    <form action={wrappedOnSubmit} className={classnames(className)}>
      <JoinFormFields />

      <label className={styles.signInFormCheckboxWrapper} htmlFor="isRealtor">
        I am a realtor
        <Checkbox id="isRealtor" name="isRealtor" defaultChecked={false} />
      </label>

      <StatusButton
        color="primary"
        size="large"
        success={state?.success}
        type="submit"
      >
        Sign Up
      </StatusButton>
    </form>
  );
}
