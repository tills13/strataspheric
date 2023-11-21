"use client";

import * as styles from "./style.css";

import {
  experimental_useFormState, // @ts-expect-error
  experimental_useFormStatus,
} from "react-dom";

import { Button } from "../../../../../components/Button";
import { DividerText } from "../../../../../components/DividerText";
import { Header } from "../../../../../components/Header";
import { Input } from "../../../../../components/Input";
import { ExternalLink } from "../../../../../components/Link/ExternalLink";
import { LoadingIcon } from "../../../../../components/LoadingIcon";
import { findYourStratasActionReducer } from "./actions";

export const runtime = "edge";

function FormLoadingIndicator() {
  const s = experimental_useFormStatus();

  return (
    s.pending && (
      <div className={styles.loadingContainer}>
        <LoadingIcon />
      </div>
    )
  );
}

export default function Page() {
  const [state, findYourStratasAction] = experimental_useFormState(
    findYourStratasActionReducer,
    { stratas: undefined },
  );

  return (
    <form action={findYourStratasAction}>
      <Header className={styles.header} priority={2}>
        Find Your Stratas
      </Header>

      <p className={styles.blurb}>
        Enter the email address associated with your account or the name of your
        strata and we&apos;ll attempt to find your stratas.
      </p>

      <Input
        className={styles.input}
        placeholder="Email Address"
        name="email_address"
        type="email"
      />

      <DividerText className={styles.divider}>or</DividerText>

      <Input
        className={styles.input}
        placeholder="Strata Name"
        name="strata_name"
      />

      <Button
        className={styles.submitButton}
        type="submit"
        size="large"
        variant="primary"
      >
        Find
      </Button>

      <FormLoadingIndicator />

      {state.stratas !== undefined && (
        <>
          <Header priority={2}>Stratas</Header>

          {state.stratas.length === 0 && <div>no stratas found</div>}

          <ul className={styles.stratasList}>
            {state.stratas.map((strata) => (
              <li key={strata.id}>
                <ExternalLink href={"https://" + strata.domain}>
                  {strata.name}
                </ExternalLink>
              </li>
            ))}
          </ul>
        </>
      )}
    </form>
  );
}
