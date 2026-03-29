import * as linkStyles from "../../components/Link/style.css";
import * as styles from "./style.css";

import { redirect } from "next/navigation";

import { auth } from "../../auth";
import { Button } from "../../components/Button";
import { DividerText } from "../../components/DividerText";
import { ArrowForwardIcon } from "../../components/Icon/ArrowForwardIcon";
import { JoinForm } from "../../components/JoinForm";
import { InternalLink } from "../../components/Link/InternalLink";
import { Logo } from "../../components/Logo";
import { SignInForm } from "../../components/SignInForm";
import { Stack } from "../../components/Stack";
import { protocol, tld } from "../../constants";
import { getCurrentStrata } from "../../data/stratas/getStrataByDomain";
import { HeroBackground } from "../@marketing/(marketing)/HeroBackground";
import { joinAction } from "../@marketing/(marketing)/join/actions";

export default async function Page({ searchParams }: PageProps<"/">) {
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
      <HeroBackground />
      <Stack className={styles.signInToStrataPageFormContainer} align="stretch">
        <Logo h="xxl" mb="large" />
        {action === "join" ? (
          <JoinForm onSubmit={joinAction} strata={strata} />
        ) : (
          <SignInForm className={styles.signInForm} />
        )}

        {strata.isPublic === 1 && (
          <>
            <DividerText>OR</DividerText>
            <InternalLink className={linkStyles.noUnderline} href="/dashboard">
              <Button
                fullWidth
                size="large"
                color="primary"
                style="secondary"
                icon={<ArrowForwardIcon />}
              >
                View Public Content
              </Button>
            </InternalLink>
          </>
        )}
      </Stack>
    </div>
  );
}
