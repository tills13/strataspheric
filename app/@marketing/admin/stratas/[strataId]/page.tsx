import { notFound } from "next/navigation";

import { Checkbox } from "../../../../../components/Checkbox";
import { Group } from "../../../../../components/Group";
import { Input } from "../../../../../components/Input";
import { Select } from "../../../../../components/Select";
import { Stack } from "../../../../../components/Stack";
import { StatusButton } from "../../../../../components/StatusButton";
import { Text } from "../../../../../components/Text";
import { getAdminStrata } from "../../../../../data/admin/getAdminStrata";
import { updateStrataAction, updateStrataPlanAction } from "./actions";

interface Props {
  params: Promise<{ strataId: string }>;
}

export default async function AdminStrataEditPage({ params }: Props) {
  const { strataId } = await params;
  const strata = await getAdminStrata(strataId);

  if (!strata) {
    notFound();
  }

  const updateStrataWithId = updateStrataAction.bind(null, strata.id);
  const updatePlanWithId = updateStrataPlanAction.bind(null, strata.id);

  return (
    <Stack p="normal" gap="normal">
      <Text as="h1" fontSize="large" fw="bold">
        Edit Strata: {strata.name}
      </Text>

      <form action={updateStrataWithId}>
        <Stack gap="normal">
          <Text as="h2" fw="bold">
            Details
          </Text>
          <Input name="name" placeholder="Name" defaultValue={strata.name} />
          <Input name="domain" placeholder="Domain" defaultValue={strata.domain} />
          <Input
            name="numUnits"
            placeholder="Number of Units"
            type="number"
            defaultValue={strata.numUnits}
          />
          <Select name="status" label="Status" defaultValue={strata.status}>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
          </Select>
          <Input
            name="streetAddress"
            placeholder="Street Address"
            defaultValue={strata.streetAddress ?? ""}
          />
          <Input name="city" placeholder="City" defaultValue={strata.city ?? ""} />
          <Input
            name="provinceState"
            placeholder="Province/State"
            defaultValue={strata.provinceState ?? ""}
          />
          <Input
            name="postalCode"
            placeholder="Postal Code"
            defaultValue={strata.postalCode ?? ""}
          />
          <Group justify="end">
            <StatusButton type="submit">Save Details</StatusButton>
          </Group>
        </Stack>
      </form>

      {strata.plan && (
        <form action={updatePlanWithId}>
          <Stack gap="normal">
            <Text as="h2" fw="bold">
              Plan Features
            </Text>
            <Group gap="normal" align="center">
              <Checkbox
                name="enableInbox"
                defaultChecked={strata.plan.enableInbox === 1}
              />
              <Text as="label">Inbox</Text>
            </Group>
            <Group gap="normal" align="center">
              <Checkbox
                name="enableInvoices"
                defaultChecked={strata.plan.enableInvoices === 1}
              />
              <Text as="label">Invoices</Text>
            </Group>
            <Group gap="normal" align="center">
              <Checkbox
                name="enableAmenities"
                defaultChecked={strata.plan.enableAmenities === 1}
              />
              <Text as="label">Amenities</Text>
            </Group>
            <Group gap="normal" align="center">
              <Checkbox
                name="enableDirectory"
                defaultChecked={strata.plan.enableDirectory === 1}
              />
              <Text as="label">Directory</Text>
            </Group>
            <Group gap="normal" align="center">
              <Checkbox
                name="enableEmailNotifications"
                defaultChecked={strata.plan.enableEmailNotifications === 1}
              />
              <Text as="label">Email Notifications</Text>
            </Group>
            <Group gap="normal" align="center">
              <Checkbox
                name="enableMeetings"
                defaultChecked={strata.plan.enableMeetings === 1}
              />
              <Text as="label">Meetings</Text>
            </Group>
            <Group justify="end">
              <StatusButton type="submit">Save Plan</StatusButton>
            </Group>
          </Stack>
        </form>
      )}
    </Stack>
  );
}
