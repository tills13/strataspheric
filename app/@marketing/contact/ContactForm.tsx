"use client";

import { s } from "../../../sprinkles.css";

import Script from "next/script";
import { useActionState, useRef, useState } from "react";

import { Header } from "../../../components/Header";
import { InfoPanel } from "../../../components/InfoPanel";
import { Input } from "../../../components/Input";
import { Stack } from "../../../components/Stack";
import { StatusButton } from "../../../components/StatusButton";
import { Text } from "../../../components/Text";
import { TextArea } from "../../../components/TextArea";
import { SubmitContactFormActionState } from "./actions";

interface Props {
  submitActionReducer: (
    state: SubmitContactFormActionState,
    fd: FormData,
  ) => Promise<SubmitContactFormActionState>;
}

export function ContactForm({ submitActionReducer }: Props) {
  const [turnstileToken, setTurnstileToken] = useState<string>();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const turnstileRef = useRef<HTMLDivElement>(null!);
  const [state, submitAction] = useActionState(submitActionReducer, {
    errorMessage: undefined,
    success: undefined,
  });

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={() => {
          window.turnstile.render(turnstileRef.current, {
            sitekey: process.env.NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY,
            callback(token) {
              setTurnstileToken(token);
            },
          });
        }}
      />

      {state.errorMessage && (
        <InfoPanel
          className={s({ mb: "large" })}
          header={<Header as="h3">Oops...</Header>}
          level="error"
        >
          <Text>{state.errorMessage}</Text>
        </InfoPanel>
      )}

      <form
        action={(fd) => {
          if (!turnstileToken) {
            throw new Error("nope");
          }

          return submitAction(fd);
        }}
      >
        <Stack>
          <Input label="Name" name="name" required />
          <Input label="Email" name="email" type="email" required />
          <Input label="Subject" name="subject" />
          <TextArea label="Message" name="message" rows={5} required />

          <input
            type="hidden"
            name="turnstileToken"
            value={turnstileToken || ""}
          />

          <div ref={turnstileRef} />

          <StatusButton
            disabled={!turnstileToken}
            color="primary"
            style="primary"
            success={state.success}
          >
            Submit
          </StatusButton>
        </Stack>
      </form>
    </>
  );
}
