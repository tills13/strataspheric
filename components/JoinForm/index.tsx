"use client";

import * as styles from "./style.css";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { experimental_useFormState as useFormState } from "react-dom";

import { type JoinFormState } from "../../app/@marketing/(marketing)/(static)/join/actions";
import { classnames } from "../../utils/classnames";
import { Checkbox } from "../Checkbox";
import { FormSubmitStatusButton } from "../FormSubmitStatusButton";
import { JoinFormFields } from "./JoinFormFields";

interface Props {
  className?: string;
  onSubmit: (state: JoinFormState, fd: FormData) => Promise<JoinFormState>;
}

export function JoinForm({ className, onSubmit }: Props) {
  const router = useRouter();

  const [state, wrappedOnSubmit] = useFormState(
    async (state: JoinFormState, fd: FormData) => {
      const nextState = await onSubmit(state, fd);

      if (nextState?.success) {
        await signIn("credentials", {
          email: fd.get("email"),
          password: fd.get("password"),
          redirect: false,
        });

        router.push("/");
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

      <FormSubmitStatusButton
        type="submit"
        variant="primary"
        size="large"
        success={state?.success}
      >
        Sign Up
      </FormSubmitStatusButton>
    </form>
  );
}
