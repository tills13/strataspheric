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
        placeholder="VIS 1234"
        defaultValue={strata.strataId || undefined}
      />

      <Input
        name="strata_address_street_address"
        label="Street Address"
        placeholder="123 Fake St."
        defaultValue={strata.streetAddress || undefined}
      />

      <Input
        name="strata_address_postal_code"
        label="Postal Code"
        placeholder="A1B 2C3"
        defaultValue={strata.postalCode || undefined}
      />

      <Group className={s({ width: "full" })} gap="normal" equalWidthChildren>
        <Input
          name="strata_address_city"
          label="City"
          placeholder="Fakeville"
          defaultValue={strata.city || undefined}
        />
        <Input
          name="strata_address_province_state"
          label="Province / State"
          placeholder="BC"
          defaultValue={strata.provinceState || undefined}
        />
      </Group>
    </Stack>
  );
}
