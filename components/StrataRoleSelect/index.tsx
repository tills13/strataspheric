import { ComponentProps } from "react";

import { Role, roleLabels } from "../../data/users/permissions";
import { Select } from "../Select";

export interface Props extends ComponentProps<typeof Select> {
  /** Roles available for selection. If not provided, shows all roles. */
  availableRoles?: Role[];
}

const DEFAULT_ROLES: Role[] = [
  "owner",
  "secretary",
  "treasurer",
  "vice-president",
  "president",
  "administrator",
];

export function StrataRoleSelect({ availableRoles, ...props }: Props) {
  const roles = availableRoles ?? DEFAULT_ROLES;

  return (
    <Select {...props}>
      {roles.map((role) => (
        <option key={role} value={role}>
          {roleLabels[role]}
        </option>
      ))}
    </Select>
  );
}
