"use client";

import { ChangeEvent, ComponentProps } from "react";

import { Select } from "../Select";

interface Props extends ComponentProps<typeof Select> {
  submitOnChange?: boolean;
}

export function StrataRoleSelect({ submitOnChange, ...delegateProps }: Props) {
  function onChange(e: ChangeEvent<HTMLSelectElement>) {
    if (submitOnChange) {
      e.currentTarget.form?.submit();
    }

    delegateProps.onChange?.(e);
  }

  return (
    <Select {...delegateProps} onChange={onChange}>
      <option value="owner">Owner</option>
      <option value="treasurer">Treasurer</option>
      <option value="vice_president">Vice President</option>
      <option value="president">President</option>
    </Select>
  );
}
