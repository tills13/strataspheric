import { StrataMembership } from "../../data/memberships/getStrataMembership";
import { Role } from "../../data/users/permissions";
import { Input } from "../Input";
import { StrataRoleSelect } from "../StrataRoleSelect";

interface Props {
  membership?: StrataMembership;
  strataRoleSelectDisabled?: boolean;
  availableRoles?: Role[];
}

export function CreateOrUpdateStrataMembershipFormFields({
  membership,
  strataRoleSelectDisabled,
  availableRoles,
}: Props) {
  return (
    <>
      <Input
        name="name"
        type="text"
        label="Name"
        placeholder="Jane Doe"
        defaultValue={membership?.name}
        disabled={!!membership}
        required
      />

      <Input
        name="email"
        type="email"
        label="Email Address"
        placeholder="jane@example.com"
        defaultValue={membership?.email}
        disabled={!!membership}
        required
      />

      <Input
        name="phone_number"
        type="text"
        label="Phone #"
        placeholder="604-555-1234"
        defaultValue={membership?.phoneNumber || undefined}
      />

      <StrataRoleSelect
        key={membership?.role}
        label="Strata Role"
        name="role"
        defaultValue={membership?.role || "owner"}
        disabled={strataRoleSelectDisabled}
        availableRoles={availableRoles}
        required
      />

    </>
  );
}
