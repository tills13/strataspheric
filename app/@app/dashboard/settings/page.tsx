import { s } from "../../../../sprinkles.css";
import * as parentStyles from "../style.css";
import * as styles from "./styles.css";

import { notFound, redirect } from "next/navigation";

import { auth } from "../../../../auth";
import { ConfirmButton } from "../../../../components/ConfirmButton";
import { DashboardHeader } from "../../../../components/DashboardHeader";
import { FileSelect } from "../../../../components/FileSelect";
import { Group } from "../../../../components/Group";
import { Header } from "../../../../components/Header";
import { DeleteIcon } from "../../../../components/Icon/DeleteIcon";
import { SaveIcon } from "../../../../components/Icon/SaveIcon";
import { InfoPanel } from "../../../../components/InfoPanel";
import { Input } from "../../../../components/Input";
import { Panel } from "../../../../components/Panel";
import { RadioButton } from "../../../../components/RadioButton";
import { Stack } from "../../../../components/Stack";
import { StatusButton } from "../../../../components/StatusButton";
import { StrataAddressFormFields } from "../../../../components/StrataAddressFormFields";
import { Text } from "../../../../components/Text";
import { getCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import { can } from "../../../../data/users/permissions";
import { classnames } from "../../../../utils/classnames";
import { updateStrataAction } from "../../actions";
import { LocationSelector } from "./LocationSelector";
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

              <StrataAddressFormFields strata={strata} />

              <FileSelect
                label="Strata Bylaws"
                name="bylawsFileId"
                placeholder="Select a File"
                defaultValue={strata.bylawsFileId ?? undefined}
              />

              <InfoPanel
                header={<Header priority={3}>Content Visibility</Header>}
                level="info"
              >
                <Text>
                  Controls access to strata content by outsiders. If your strata
                  is public, visitors to your Strataspheric page that are not
                  members will be able to see content on your dashboard, certain
                  files that are public, and upcoming events.
                </Text>
                <RadioButton
                  className={s({ flex: 1 })}
                  name="visibility"
                  options={["private", "public"]}
                  defaultValue={strata.isPublic ? "public" : "private"}
                />
              </InfoPanel>

              <Header priority={2}>Location</Header>
              <Text color="secondary">
                Let people know where to find your strata.
              </Text>
              <LocationSelector
                defaultCenter={
                  strata.latitude && strata.longitude
                    ? [strata.latitude, strata.longitude]
                    : undefined
                }
              />
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
            <Text>
              Deleting your Strata will delete all information and files
              associated with your strata unrecoverably.
            </Text>
          </InfoPanel>
        </div>
      </div>
    </>
  );
}
