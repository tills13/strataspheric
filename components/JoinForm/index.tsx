"use client";

import * as buttonStyles from "../Button/style.css";
import * as styles from "./style.css";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useFormState } from "react-dom";

import { type JoinFormState } from "../../app/@marketing/(marketing)/(static)/join/actions";
import { classnames } from "../../utils/classnames";
import { Checkbox } from "../Checkbox";
import { FormSubmitStatusButton } from "../FormSubmitStatusButton";
import { Header } from "../Header";
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

      <FormSubmitStatusButton
        className={classnames(
          buttonStyles.buttonFullWidth,
          buttonStyles.buttonSizes.large,
          buttonStyles.buttonVariants.primary,
        )}
        type="submit"
        success={state?.success}
      >
        Sign Up
      </FormSubmitStatusButton>
    </form>
  );
}
