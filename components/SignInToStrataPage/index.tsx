import * as styles from "./style.css";

import Link from "next/link";
import { requestToJoinStrataAction } from "../../app/actions";
import { Button } from "../Button";
import { DividerText } from "../DividerText";
import { ElementGroup } from "../ElementGroup";
import { Header } from "../Header";
import { JoinStrataForm } from "../JoinStrataForm";
import { SignInForm } from "../SignInForm";
import { Strata } from "../../data/stratas/getStrata";

interface Props {
  action?: "join" | "signin";
  strata: Strata;
}

export function SignInToStrataPage({ action, strata }: Props) {
  return (
    <div className={styles.signInToStrataPageContainer}>
      <ElementGroup
        className={styles.signInToStrataPageFormContainer}
        orientation="column"
      >
        <Header priority={2}>
          {action === "join" ? "Request to Join" : "Sign In"}
        </Header>

        {action === "join" ? (
          <JoinStrataForm
            className={styles.signInForm}
            requestToJoinStrata={requestToJoinStrataAction}
            strataId={strata.id}
          />
        ) : (
          <SignInForm className={styles.signInForm} />
        )}

        {strata.visibility === "public" && (
          <>
            <DividerText>or</DividerText>
            <Link href="/dashboard">
              <Button className={styles.actionButton}>
                view public content
              </Button>
            </Link>
          </>
        )}

        <DividerText>or</DividerText>

        {action === "join" ? (
          <Link href="/?action=signin">
            <Button className={styles.actionButton}>Sign In</Button>
          </Link>
        ) : (
          <Link href="/?action=join">
            <Button className={styles.actionButton}>Request to join</Button>
          </Link>
        )}
      </ElementGroup>
    </div>
  );
}
