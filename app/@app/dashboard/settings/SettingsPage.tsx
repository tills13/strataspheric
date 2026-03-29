import { s } from "../../../../sprinkles.css";

import { ConfirmButton } from "../../../../components/ConfirmButton";
import { DashboardLayout } from "../../../../components/DashboardLayout";
import { FileSelect } from "../../../../components/FileSelect";
import { Header } from "../../../../components/Header";
import { DeleteIcon } from "../../../../components/Icon/DeleteIcon";
import { SaveIcon } from "../../../../components/Icon/SaveIcon";
import { InfoPanel } from "../../../../components/InfoPanel";
import { Input } from "../../../../components/Input";
import { RadioButton } from "../../../../components/RadioButton";
import { Stack } from "../../../../components/Stack";
import { StatusButton } from "../../../../components/StatusButton";
import { StrataAddressFormFields } from "../../../../components/StrataAddressFormFields";
import { Text } from "../../../../components/Text";
import { mustGetCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import { updateStrataAction } from "../../actions";
import { LocationSelector } from "./LocationSelector";
import {
  createStripeConnectAccountAction,
  createStripeConnectDashboardLinkAction,
  deleteStrataAction,
} from "./actions";

interface Props {
  canEdit: boolean;
}

export async function SettingsPage({ canEdit }: Props) {
  const strata = await mustGetCurrentStrata();

  return (
    <DashboardLayout title="Settings">
      <form action={updateStrataAction.bind(undefined, strata.id)}>
        <fieldset
          disabled={!canEdit}
          style={{ border: "none", padding: 0, margin: 0 }}
        >
          <Stack>
            <Header as="h3">Strata Name</Header>
            <Input
              name="name"
              label="Strata Name"
              placeholder="e.g. Oceanview Estates"
              defaultValue={strata.name}
            />

            <Header as="h3">Strata ID & Address</Header>

            <StrataAddressFormFields strata={strata} />

            <Text>
              Show people where to find you. <i>note</i> this is manual for now.
            </Text>

            <LocationSelector
              defaultCenter={
                strata.latitude && strata.longitude
                  ? [strata.latitude, strata.longitude]
                  : undefined
              }
            />

            <Header as="h3">Strata Bylaws</Header>

            <FileSelect
              label="Strata Bylaws"
              name="bylawsFileId"
              defaultValue={strata.bylawsFileId ?? undefined}
            />

            <Header as="h3">Strata Inbox Email</Header>
            <Text color="secondary">
              All inbox message notifications will be copied to this email
              address. Leave blank to disable.
            </Text>
            <Input
              name="inboxEmail"
              label="Global Inbox Email"
              type="email"
              defaultValue={strata.inboxEmail || ""}
              placeholder="council@yourstrata.com"
            />

            <Header as="h3">Content Visibility</Header>
            <Text>
              Controls access to strata content by outsiders. If your strata is
              public, visitors to your Strataspheric page that are not members
              will be able to see content on your dashboard, certain files that
              are public, and upcoming events.
            </Text>
            <RadioButton
              className={s({ flex: 1 })}
              name="visibility"
              options={["private", "public"]}
              defaultValue={strata.isPublic ? "public" : "private"}
            />

            {canEdit && (
              <StatusButton
                color="success"
                icon={<SaveIcon />}
                style="primary"
                type="submit"
              >
                Update Strata
              </StatusButton>
            )}
          </Stack>
        </fieldset>
      </form>

      <Stack>
        <Header as="h3">Payment Processing</Header>
        <Text>
          Connect a Stripe account to collect payments from owners and members
          directly via Strataspheric invoices.
        </Text>
        {strata.stripeAccountStatus === "active" ? (
          <Stack gap="small">
            <Text color="success">Stripe account connected and active.</Text>
            <form action={createStripeConnectDashboardLinkAction}>
              <StatusButton
                color="primary"
                style="secondary"
                type="submit"
                fullWidth
              >
                Open Stripe Dashboard
              </StatusButton>
            </form>
          </Stack>
        ) : strata.stripeAccountStatus === "pending" ? (
          <form action={createStripeConnectAccountAction}>
            <StatusButton
              color="primary"
              style="secondary"
              type="submit"
              disabled={!canEdit}
              fullWidth
            >
              Complete Stripe Setup
            </StatusButton>
          </form>
        ) : (
          <form action={createStripeConnectAccountAction}>
            <StatusButton
              color="primary"
              style="secondary"
              type="submit"
              disabled={!canEdit}
              fullWidth
            >
              Connect Stripe Account
            </StatusButton>
          </form>
        )}
      </Stack>

      {canEdit && (
        <InfoPanel
          action={
            <ConfirmButton
              icon={<DeleteIcon />}
              onClickConfirm={deleteStrataAction}
              color="error"
              style="secondary"
            >
              Delete Strata
            </ConfirmButton>
          }
          header={<Header as="h3">Danger Zone</Header>}
          level="error"
        >
          <Text>
            Deleting your Strata will delete all information and files
            associated with your strata unrecoverably.
          </Text>
        </InfoPanel>
      )}
    </DashboardLayout>
  );
}
