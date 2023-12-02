"use client";

import { ChangeEvent, ComponentProps } from "react";

import { Select } from "../Select";

interface Props extends ComponentProps<typeof Select> {}

export function StrataRoleSelect(props: Props) {
  return (
    <Select {...props}>
      <option value="owner">Owner</option>
      <option value="treasurer">Treasurer</option>
      <option value="vice_president">Vice President</option>
      <option value="president">President</option>
      <option value="administrator">Administrator</option>
    </Select>
  );
}
