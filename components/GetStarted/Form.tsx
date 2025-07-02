"use client";

import * as styles from "./style.css";

import { Stripe, StripeElements } from "@stripe/stripe-js";
import Script from "next/script";
import { createContext, useActionState, useContext, useRef } from "react";

import { submitGetStartedAction } from "../../app/@marketing/get-started/actions";
import { GetStartedFormStep } from "../../app/@marketing/get-started/types";
import { signIn } from "../../auth/actions";
import { useRefreshSession } from "../../hooks/useRefreshSession";
import { useSession } from "../../hooks/useSession";
import { classnames } from "../../utils/classnames";
import * as formdata from "../../utils/formdata";

export const FormStateContext = createContext<GetStartedFormStep | undefined>(
  undefined,
);

export function useFormState() {
  return useContext(FormStateContext);
}

interface Props {
  className?: string;
  children: React.ReactNode;
}

export function GetStartedForm({ className, children }: Props) {
  const session = useSession();

  const refreshSession = useRefreshSession();

  const stripeRef = useRef<Stripe>(undefined);
  const elementsRef = useRef<StripeElements>(undefined);

  const [actionState, action] = useActionState<GetStartedFormStep, FormData>(
    async (state: GetStartedFormStep, fd: FormData) => {
      if (state.step === "SUBMIT_PAYMENT") {
        if (!elementsRef.current || !stripeRef.current) {
          return { ...state, error: "something went wrong..." };
        }

        await elementsRef.current.submit();
        await stripeRef.current.confirmSetup({
          elements: elementsRef.current,
          clientSecret: state.stripeClientSecret,
          redirect: "if_required",
        });
      }

      const nextState = await submitGetStartedAction(state, fd);

      if (
        state.step === "CREATE_ACCOUNT" &&
        nextState.step !== "CREATE_ACCOUNT"
      ) {
        await signIn(
          formdata.getString(fd, "email"),
          formdata.getString(fd, "password"),
        );
        await refreshSession();
      } else if (nextState.step === "SUCCESS") {
        location.href = nextState.redirect;
      }

      return nextState;
    },
    session ? { step: "CREATE_STRATA" } : { step: "CREATE_ACCOUNT" },
  );

  return (
    <form
      action={action}
      className={classnames(styles.getStartedForm, className)}
    >
      <FormStateContext.Provider value={actionState}>
        {actionState.step === "SUBMIT_PAYMENT" && (
          <Script
            src="https://js.stripe.com/basil/stripe.js"
            onLoad={() => {
              const stripe = window.Stripe(
                process.env.NEXT_PUBLIC_STRIPE_PUSHABLE_KEY,
              );
              stripeRef.current = stripe;
              const appearance = {};

              const elements = stripe.elements({
                clientSecret: actionState.stripeClientSecret,
                appearance,
              });

              elementsRef.current = elements;
              elements.create("payment", {}).mount("#payment-element");
            }}
          />
        )}
        {children}
      </FormStateContext.Provider>
    </form>
  );
}
