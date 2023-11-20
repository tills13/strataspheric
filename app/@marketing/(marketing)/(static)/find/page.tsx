"use client";

import * as styles from "./style.css";

import { Button } from "../../../../../components/Button";
import { Input } from "../../../../../components/Input";
import { findYourStratasActionReducer } from "./actions";
import { Header } from "../../../../../components/Header";
import { DividerText } from "../../../../../components/DividerText";
import { experimental_useFormState } from "react-dom";
import { ExternalLink } from "../../../../../components/Link/ExternalLink";

export const runtime = "edge";

export default function Page() {
  const [state, findYourStratasAction] = experimental_useFormState(
    findYourStratasActionReducer,
    { stratas: [] },
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

      <Header priority={2}>Stratas</Header>

      <ul className={styles.stratasList}>
        {state.stratas.map((strata) => (
          <li key={strata.id}>
            <ExternalLink href={"https://" + strata.domain}>
              {strata.name}
            </ExternalLink>
          </li>
        ))}
      </ul>
    </form>
  );
}
