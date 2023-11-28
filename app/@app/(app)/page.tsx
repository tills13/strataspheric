import * as buttonStyles from "../../../components/Button/style.css";
import * as linkStyles from "../../../components/Link/style.css";
import * as styles from "./style.css";

import { notFound, redirect } from "next/navigation";
import React from "react";

import { auth } from "../../../auth";
import { Button } from "../../../components/Button";
import { DividerText } from "../../../components/DividerText";
import { ElementGroup } from "../../../components/ElementGroup";
import { Header } from "../../../components/Header";
import { JoinStrataForm } from "../../../components/JoinStrataForm";
import { InternalLink } from "../../../components/Link/InternalLink";
import { SignInForm } from "../../../components/SignInForm";
import { getCurrentStrata } from "../../../data/stratas/getStrataByDomain";
import { classnames } from "../../../utils/classnames";
import { requestToJoinStrataAction } from "../../actions";

export const runtime = "edge";

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, any>;
}) {
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
            <InternalLink className={linkStyles.noUnderline} href="/dashboard">
              <Button
                className={classnames(
                  buttonStyles.button,
                  buttonStyles.buttonSizes.large,
                )}
              >
                view public content
              </Button>
            </InternalLink>
          </>
        )}

        <DividerText>or</DividerText>

        {action === "join" ? (
          <InternalLink
            className={linkStyles.noUnderline}
            href="/?action=signin"
          >
            <Button
              className={classnames(
                buttonStyles.button,
                buttonStyles.buttonSizes.large,
              )}
            >
              Sign In
            </Button>
          </InternalLink>
        ) : (
          <InternalLink className={linkStyles.noUnderline} href="/?action=join">
            <Button
              className={classnames(
                buttonStyles.button,
                buttonStyles.buttonSizes.large,
              )}
            >
              Request to join
            </Button>
          </InternalLink>
        )}
      </ElementGroup>
    </div>
  );
}
