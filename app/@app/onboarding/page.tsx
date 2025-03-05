import { s } from "../../../sprinkles.css";
import * as styles from "./style.css";

import { AttachFileField } from "../../../components/AttachFileField";
import { Header } from "../../../components/Header";
import { StatusButton } from "../../../components/StatusButton";
import { StrataAddressFormFields } from "../../../components/StrataAddressFormFields";
import { mustGetCurrentStrata } from "../../../data/stratas/getStrataByDomain";
import { classnames } from "../../../utils/classnames";
import { upsertFileAction } from "../dashboard/files/actions";
import { AttachBylawsField } from "./AttachBylawsField";
import { completeOnboardingAction } from "./actions";

export const runtime = "edge";

export default async function Onboarding() {
  const strata = await mustGetCurrentStrata();

  return (
    <form action={completeOnboardingAction} className={styles.pageContainer}>
      <Header className={s({ mb: "normal" })} priority={2}>
        Welcome to Strataspheric.
        <br />
        Welcome to your Strata.
      </Header>

      <Header className={s({ mb: "large" })} priority={3}>
        Let&apos;s get a few things setup for you...
      </Header>

      <Header className={s({ mb: "small" })} priority={3}>
        Address
      </Header>

      <p className={classnames(styles.description, s({ mb: "small" }))}>
        Add your address to allow people to find your strata.
      </p>

      <div className={s({ mb: "large" })}>
        <StrataAddressFormFields strata={strata} />
      </div>

      <Header className={s({ mb: "small" })} priority={3}>
        Bylaws
      </Header>

      <p className={classnames(styles.description, s({ mb: "small" }))}>
        Add your bylaws for easy reference
      </p>

      <AttachBylawsField
        upsertFileAction={upsertFileAction.bind(undefined, undefined)}
      />

      <StatusButton color="primary">Ok, I&apos;m Done</StatusButton>
    </form>
  );
}
