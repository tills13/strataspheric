"use client";

import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import { signIn } from "next-auth/react";
import React from "react";
import { useFormState } from "react-dom";

import { type JoinFormState } from "../../app/@marketing/join/actions";
import { Strata } from "../../data";
import { classnames } from "../../utils/classnames";
import { Checkbox } from "../Checkbox";
import { InfoPanel } from "../InfoPanel";
import { StatusButton } from "../StatusButton";
import { JoinFormFields } from "./JoinFormFields";

interface Props {
  className?: string;
  onSubmit: (state: JoinFormState, fd: FormData) => Promise<JoinFormState>;
  strata?: Strata;
}

export function JoinForm({ className, onSubmit, strata }: Props) {
  const [state, onSubmitAction] = useFormState(
    async (state: JoinFormState, fd: FormData) => {
      if (strata) {
        fd.set("strataId", strata.id);
      }

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
    <form action={onSubmitAction} className={classnames(className)}>
      <div className={s({ mb: "large" })}>
        <JoinFormFields />

        <label
          className={classnames(
            styles.signInFormCheckboxWrapper,
            s({ marginBottom: "normal" }),
          )}
          htmlFor="isRealtor"
        >
          I am a realtor
          <Checkbox id="isRealtor" name="isRealtor" defaultChecked={false} />
        </label>

        {!state?.success && state?.error && (
          <InfoPanel level="error">{state.error}</InfoPanel>
        )}
      </div>

      <StatusButton color="primary" success={state?.success} type="submit">
        {strata ? `Join ${strata.name}` : "Sign Up"}
      </StatusButton>
    </form>
  );
}
