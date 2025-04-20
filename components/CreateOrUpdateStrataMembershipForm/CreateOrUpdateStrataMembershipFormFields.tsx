import { StrataMembership } from "../../data/memberships/getStrataMembership";
import { Input } from "../Input";
import { StrataRoleSelect } from "../StrataRoleSelect";

interface Props {
  membership?: StrataMembership;
  strataRoleSelectDisabled?: boolean;
}

export function CreateOrUpdateStrataMembershipFormFields({
  membership,
  strataRoleSelectDisabled,
}: Props) {
  return (
    <>
      <Input
        name="name"
        type="text"
        label="Name"
        defaultValue={membership?.name}
        disabled={!!membership}
        required
      />

      <Input
        name="unit"
        type="text"
        label="Unit"
        defaultValue={membership?.unit || undefined}
        required
      />

      <Input
        name="email"
        type="email"
        label="Email Address"
        defaultValue={membership?.email}
        disabled={!!membership}
        required
      />

      <Input
        name="phone_number"
        type="text"
        label="Phone #"
        defaultValue={membership?.phoneNumber || undefined}
      />

      <StrataRoleSelect
        label="Strata Role"
        name="role"
        defaultValue={membership?.role || "owner"}
        disabled={strataRoleSelectDisabled}
        required
      />
    </>
  );
}
