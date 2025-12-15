import { ComponentProps } from "react";

import { Role } from "../../data/users/permissions";
import { Select } from "../Select";

export interface Props extends ComponentProps<typeof Select> {
  /** Roles available for selection. If not provided, shows all roles. */
  availableRoles?: Role[];
}

const roleLabels: Record<Role, string> = {
  owner: "Owner",
  secretary: "Secretary",
  treasurer: "Treasurer",
  "vice-president": "Vice President",
  president: "President",
  administrator: "Administrator",
  pending: "Pending",
};

const defaultRoles: Role[] = [
  "owner",
  "secretary",
  "treasurer",
  "vice-president",
  "president",
  "administrator",
];

export function StrataRoleSelect({ availableRoles, ...props }: Props) {
  const roles = availableRoles ?? defaultRoles;

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
