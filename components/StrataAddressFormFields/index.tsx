import { s } from "../../sprinkles.css";

import { Strata } from "../../data";
import { Group } from "../Group";
import { Input } from "../Input";
import { Stack } from "../Stack";

interface Props {
  className?: string;
  strata: Strata;
}

export function StrataAddressFormFields({ className, strata }: Props) {
  return (
    <Stack className={className}>
      <Input
        name="strata_id"
        label="Strata Plan ID"
        placeholder="VIS..."
        defaultValue={strata.strataId || undefined}
      />

      <Input
        name="strata_address_street_address"
        label="Street Address"
        defaultValue={strata.streetAddress || undefined}
      />

      <Input
        name="strata_address_postal_code"
        label="Postal Code"
        defaultValue={strata.postalCode || undefined}
      />

      <Group className={s({ width: "full" })} gap="normal" equalWidthChildren>
        <Input
          name="strata_address_city"
          label="City"
          defaultValue={strata.city || undefined}
        />
        <Input
          name="strata_address_province_state"
          label="Province / State"
          defaultValue={strata.provinceState || undefined}
        />
      </Group>
    </Stack>
  );
}
