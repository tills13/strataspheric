import { s } from "../../sprinkles.css";

import { Strata } from "../../data";
import { ElementGroup } from "../ElementGroup";
import { InputField } from "../InputField";

export function StrataAddressFormFields({ strata }: { strata: Strata }) {
  return (
    <>
      <InputField
        className={s({ mb: "small" })}
        name="strata_id"
        placeholder="Strata Plan ID (e.g. VIS...)"
        defaultValue={strata.strataId || undefined}
      />

      <InputField
        className={s({ mb: "small" })}
        name="strata_address_street_address"
        placeholder="Street Address"
        defaultValue={strata.streetAddress || undefined}
      />

      <InputField
        className={s({ mb: "small" })}
        name="strata_address_postal_code"
        placeholder="Postal Code"
        defaultValue={strata.postalCode || undefined}
      />

      <ElementGroup
        className={s({ width: "full" })}
        gap="small"
        equalWidthChildren
      >
        <InputField
          wrapperClassName={s({ width: "full" })}
          name="strata_address_city"
          placeholder="City"
          defaultValue={strata.city || undefined}
        />
        <InputField
          wrapperClassName={s({ width: "full" })}
          name="strata_address_province_state"
          placeholder="Province / State"
          defaultValue={strata.provinceState || undefined}
        />
      </ElementGroup>
    </>
  );
}
