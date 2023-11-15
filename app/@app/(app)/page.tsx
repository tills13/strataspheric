import * as styles from "./style.css";

import React from "react";
import { auth } from "../../../auth";
import { notFound, redirect } from "next/navigation";
import { SignInForm } from "../../../components/SignInForm";
import Link from "next/link";
import { Header } from "../../../components/Header";
import { JoinStrataForm } from "../../../components/JoinStrataForm";
import { requestToJoinStrataAction } from "../../actions";
import { DividerText } from "../../../components/DividerText";
import { Button } from "../../../components/Button";
import { ElementGroup } from "../../../components/ElementGroup";
import { getCurrentStrata } from "../../../data/stratas/getStrata";

export const runtime = "edge";

export default async function Page({ searchParams }: any) {
  const session = await auth();
  const action = searchParams["action"];

  if (session) {
    redirect("/dashboard");
  }

  const strata = await getCurrentStrata();

  if (!strata) {
    notFound();
  }

  if (strata?.isPublic && action === undefined) {
    redirect("/dashboard");
  }

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

        {strata.isPublic && (
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
