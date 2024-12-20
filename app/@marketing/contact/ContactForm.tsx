"use client";

import { s } from "../../../sprinkles.css";

import Script from "next/script";
import { useRef, useState } from "react";
import { useFormState } from "react-dom";

import { Input } from "../../../components/Input";
import { StatusButton } from "../../../components/StatusButton";
import { TextArea } from "../../../components/TextArea";
import { SubmitContactFormActionState } from "./actions";

interface Props {
  submitActionReducer: (
    state: SubmitContactFormActionState,
    fd: FormData,
  ) => Promise<SubmitContactFormActionState>;
}

export function ContactForm({ submitActionReducer }: Props) {
  const [turnstileChallengePassed, setTurnstileChallengePassed] =
    useState(false);
  const turnstileRef = useRef<HTMLDivElement>(null!);
  const [state, action] = useFormState(submitActionReducer, {
    success: undefined,
  });

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={() => {
          window.turnstile.render(turnstileRef.current, {
            sitekey: "0x4AAAAAAAgFC_7r3cnBgJUF",
            callback() {
              setTurnstileChallengePassed(true);
            },
          });
        }}
      />

      <form action={action}>
        <Input
          wrapperClassName={s({ mb: "normal" })}
          label="Name"
          name="name"
          required
        />
        <Input
          wrapperClassName={s({ mb: "normal" })}
          label="Email"
          name="email"
          type="email"
          required
        />
        <Input
          wrapperClassName={s({ mb: "normal" })}
          label="Subject"
          name="subject"
        />
        <TextArea
          className={s({ mb: "normal", w: "full" })}
          label="Message"
          name="message"
          rows={5}
          required
        />

        <div className={s({ mb: "normal", w: "full" })} ref={turnstileRef} />

        <StatusButton
          disabled={!turnstileChallengePassed}
          color="primary"
          style="primary"
          success={state.success}
        >
          Submit
        </StatusButton>
      </form>
    </>
  );
}
