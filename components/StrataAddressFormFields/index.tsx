import { s } from "../../sprinkles.css";

import { Strata } from "../../data";
import { ElementGroup } from "../ElementGroup";
import { Input } from "../Input";

export function StrataAddressFormFields({ strata }: { strata: Strata }) {
  return (
    <>
      <Input
        className={s({ mb: "small" })}
        name="strata_id"
        label="Strata Plan ID"
        placeholder="VIS..."
        defaultValue={strata.strataId || undefined}
      />

      <Input
        className={s({ mb: "small" })}
        name="strata_address_street_address"
        label="Street Address"
        defaultValue={strata.streetAddress || undefined}
      />

      <Input
        className={s({ mb: "small" })}
        name="strata_address_postal_code"
        label="Postal Code"
        defaultValue={strata.postalCode || undefined}
      />

      <ElementGroup
        className={s({ width: "full" })}
        gap="small"
        equalWidthChildren
      >
        <Input
          wrapperClassName={s({ width: "full" })}
          name="strata_address_city"
          label="City"
          defaultValue={strata.city || undefined}
        />
        <Input
          wrapperClassName={s({ width: "full" })}
          name="strata_address_province_state"
          label="Province / State"
          defaultValue={strata.provinceState || undefined}
        />
      </ElementGroup>
    </>
  );
}
