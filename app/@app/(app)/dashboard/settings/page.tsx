import * as parentStyles from "../style.css";
import * as styles from "./styles.css";

import { notFound, redirect } from "next/navigation";

import { auth } from "../../../../../auth";
import { Checkbox } from "../../../../../components/Checkbox";
import { ConfirmButton } from "../../../../../components/ConfirmButton";
import { DashboardHeader } from "../../../../../components/DashboardHeader";
import { ElementGroup } from "../../../../../components/ElementGroup";
import { Header } from "../../../../../components/Header";
import { DeleteIcon } from "../../../../../components/Icon/DeleteIcon";
import { SaveIcon } from "../../../../../components/Icon/SaveIcon";
import { InfoPanel } from "../../../../../components/InfoPanel";
import { Input } from "../../../../../components/Input";
import { StatusButton } from "../../../../../components/StatusButton";
import { getCurrentStrata } from "../../../../../data/stratas/getStrataByDomain";
import { can } from "../../../../../data/users/permissions";
import { classnames } from "../../../../../utils/classnames";
import { deleteStrataAction, updateStrataAction } from "./actions";

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
            action={updateStrataAction}
            className={classnames(styles.form, styles.marginBottomLarge)}
          >
            <ElementGroup orientation="column" gap="small">
              <input name="id" type="hidden" defaultValue={strata.id} />

              <Header className={styles.header} priority={3}>
                Strata Name
              </Header>
              <Input name="name" defaultValue={strata.name} />

              <label className={styles.isPublicField} htmlFor="is_public">
                <Header priority={3}>
                  I want my strata&apos;s content to be public
                </Header>
                <Checkbox
                  id="is_public"
                  name="is_public"
                  defaultChecked={strata.isPublic === 1}
                />
              </label>

              <Header className={styles.header} priority={3}>
                Strata Plan ID
              </Header>
              <Input
                name="strata_id"
                placeholder="Strata Plan ID (e.g. VIS...)"
                defaultValue={strata.strataId || undefined}
              />

              <Header className={styles.header} priority={3}>
                Address
              </Header>

              <Input
                name="strata_address_street_address"
                placeholder="Street Address"
                defaultValue={strata.streetAddress || undefined}
              />

              <Input
                name="strata_address_postal_code"
                placeholder="Postal Code"
                defaultValue={strata.postalCode || undefined}
              />

              <ElementGroup
                className={styles.formElement}
                gap="small"
                equalWidthChildren
              >
                <Input
                  className={styles.formElement}
                  name="strata_address_city"
                  placeholder="City"
                  defaultValue={strata.city || undefined}
                />
                <Input
                  className={styles.formElement}
                  name="strata_address_province_state"
                  placeholder="Province / State"
                  defaultValue={strata.provinceState || undefined}
                />
              </ElementGroup>

              <StatusButton
                color="primary"
                iconRight={<SaveIcon />}
                style="secondary"
                type="submit"
              >
                Update Strata
              </StatusButton>
            </ElementGroup>
          </form>

          <InfoPanel level="error">
            <ElementGroup orientation="column">
              <Header priority={3}>Danger Zone</Header>

              <p>
                Deleting your Strata will delete all information and files
                associated with your strata unrecoverably.
              </p>

              <ConfirmButton
                iconRight={<DeleteIcon />}
                onClickConfirm={deleteStrataAction}
                color="error"
                style="secondary"
              >
                Delete Strata
              </ConfirmButton>
            </ElementGroup>
          </InfoPanel>
        </div>
      </div>
    </>
  );
}
