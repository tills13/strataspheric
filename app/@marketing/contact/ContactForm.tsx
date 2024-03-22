"use client";

import { s } from "../../../sprinkles.css";

import { useFormState } from "react-dom";

import { InputField } from "../../../components/InputField";
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
  const [state, action] = useFormState(submitActionReducer, {
    success: undefined,
  });

  return (
    <form action={action}>
      <InputField
        wrapperClassName={s({ mb: "normal" })}
        placeholder="Name"
        name="name"
        required
      />
      <InputField
        wrapperClassName={s({ mb: "normal" })}
        placeholder="Email"
        name="email"
        type="email"
        required
      />
      <InputField
        wrapperClassName={s({ mb: "normal" })}
        placeholder="Subject"
        name="subject"
      />
      <TextArea
        className={s({ mb: "normal", w: "full" })}
        placeholder="Message"
        name="message"
        rows={5}
        required
      />

      <StatusButton color="primary" style="primary" success={state.success}>
        Submit
      </StatusButton>
    </form>
  );
}
