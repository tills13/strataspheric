"use client";

import { ComponentProps } from "react";

import { SelectField } from "../SelectField";

interface Props extends ComponentProps<typeof SelectField> {}

export function StrataRoleSelect(props: Props) {
  return (
    <SelectField {...props}>
      <option value="owner">Owner</option>
      <option value="treasurer">Treasurer</option>
      <option value="vice-president">Vice President</option>
      <option value="president">President</option>
      <option value="administrator">Administrator</option>
    </SelectField>
  );
}
