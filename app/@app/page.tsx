import * as linkStyles from "../../components/Link/style.css";
import * as styles from "./style.css";

import { redirect } from "next/navigation";
import React from "react";

import { PageProps } from "../../.next/types/app/@app/page";
import { auth } from "../../auth";
import { Button } from "../../components/Button";
import { DividerText } from "../../components/DividerText";
import { JoinForm } from "../../components/JoinForm";
import { InternalLink } from "../../components/Link/InternalLink";
import { SignInForm } from "../../components/SignInForm";
import { Stack } from "../../components/Stack";
import { protocol, tld } from "../../constants";
import { getCurrentStrata } from "../../data/stratas/getStrataByDomain";
import { joinAction } from "../@marketing/join/actions";

export const runtime = "edge";

export default async function Page({ searchParams }: PageProps) {
  const session = await auth();
  const { action } = await searchParams;

  if (session) {
    redirect("/dashboard");
  }

  const strata = await getCurrentStrata();

  if (!strata) {
    redirect(protocol + "//" + tld);
  }

  if (strata.isPublic && action === undefined) {
    redirect("/dashboard");
  }

  return (
    <div className={styles.signInToStrataPageContainer}>
      <Stack className={styles.signInToStrataPageFormContainer}>
        {action === "join" ? (
          <JoinForm onSubmit={joinAction} strata={strata} />
        ) : (
          <SignInForm className={styles.signInForm} />
        )}

        {strata.isPublic === 1 && (
          <>
            <DividerText>OR</DividerText>
            <InternalLink className={linkStyles.noUnderline} href="/dashboard">
              <Button fullWidth size="large">
                view public content
              </Button>
            </InternalLink>
          </>
        )}
      </Stack>
    </div>
  );
}
