"use client";

import { createUnitAction } from "../../app/@app/dashboard/membership/units/actions";
import { Input } from "../Input";
import { Stack } from "../Stack";
import { StatusButton } from "../StatusButton";

interface Props {
  levyMode: "entitlement" | "custom";
  onCreateUnit?: () => void;
}

export function CreateOrUpdateUnitForm({ levyMode, onCreateUnit }: Props) {
  return (
    <form
      action={async (fd) => {
        await createUnitAction(fd);
        onCreateUnit?.();
      }}
    >
      <Stack>
        <Input name="unit_number" type="text" placeholder="e.g. 101" required />

        {levyMode === "entitlement" && (
          <Input
            name="entitlement_shares"
            type="number"
            min={1}
            defaultValue={1}
          />
        )}
        {levyMode === "custom" && (
          <Input
            name="custom_monthly_fee"
            type="number"
            min={0}
            placeholder="Monthly fee"
          />
        )}

        <StatusButton color="primary" style="primary" type="submit">
          Create Unit
        </StatusButton>
      </Stack>
    </form>
  );
}
