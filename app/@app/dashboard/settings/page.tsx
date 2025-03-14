import { s } from "../../../../sprinkles.css";
import * as parentStyles from "../style.css";
import * as styles from "./styles.css";

import { notFound, redirect } from "next/navigation";

import { auth } from "../../../../auth";
import { Checkbox } from "../../../../components/Checkbox";
import { ConfirmButton } from "../../../../components/ConfirmButton";
import { DashboardHeader } from "../../../../components/DashboardHeader";
import { Group } from "../../../../components/Group";
import { Header } from "../../../../components/Header";
import { DeleteIcon } from "../../../../components/Icon/DeleteIcon";
import { SaveIcon } from "../../../../components/Icon/SaveIcon";
import { InfoPanel } from "../../../../components/InfoPanel";
import { Input } from "../../../../components/Input";
import { Stack } from "../../../../components/Stack";
import { StatusButton } from "../../../../components/StatusButton";
import { StrataAddressFormFields } from "../../../../components/StrataAddressFormFields";
import { getCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import { can } from "../../../../data/users/permissions";
import { classnames } from "../../../../utils/classnames";
import { updateStrataAction } from "../../actions";
import { deleteStrataAction } from "./actions";

export const runtime = "edge";

export default async function Page() {
  const session = await auth();
  const strata = await getCurrentStrata();

  if (!strata) {
    notFound();
  }

  if (!can(session?.user, "stratas.edit")) {
    redirect("/dashboard");
  }

  return (
    <>
      <DashboardHeader />
      <div className={parentStyles.pageContainer}>
        <div className={styles.centerContainer}>
          <form
            action={updateStrataAction.bind(undefined, strata.id)}
            className={classnames(styles.form, s({ mb: "large", mt: "large" }))}
          >
            <Stack gap="normal" className={s({ mb: "large" })}>
              <Input
                name="name"
                label="Strata Name"
                defaultValue={strata.name}
              />

              <StrataAddressFormFields
                className={s({ mb: "normal" })}
                strata={strata}
              />

              <label htmlFor="is_public">
                <Group justify="space-between">
                  <Header priority={3}>
                    I want my strata&apos;s content to be public
                  </Header>
                  <Checkbox
                    id="is_public"
                    name="is_public"
                    defaultChecked={strata.isPublic === 1}
                  />
                </Group>
              </label>
            </Stack>
            <StatusButton
              color="success"
              iconRight={<SaveIcon />}
              style="primary"
              type="submit"
            >
              Update Strata
            </StatusButton>
          </form>

          <InfoPanel
            action={
              <ConfirmButton
                iconRight={<DeleteIcon />}
                onClickConfirm={deleteStrataAction}
                color="error"
                style="secondary"
              >
                Delete Strata
              </ConfirmButton>
            }
            header={<Header priority={3}>Danger Zone</Header>}
            level="error"
          >
            Deleting your Strata will delete all information and files
            associated with your strata unrecoverably.
          </InfoPanel>
        </div>
      </div>
    </>
  );
}
