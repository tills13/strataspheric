import { ComponentProps } from "react";

import { Select } from "../Select";

export type Props = ComponentProps<typeof Select>;

export function StrataRoleSelect(props: Props) {
  return (
    <Select {...props}>
      <option value="owner">Owner</option>
      <option value="treasurer">Treasurer</option>
      <option value="vice-president">Vice President</option>
      <option value="president">President</option>
      <option value="administrator">Administrator</option>
    </Select>
  );
}
