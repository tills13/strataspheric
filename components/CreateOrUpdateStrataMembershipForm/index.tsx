import * as styles from "./style.css";

import { StrataMembership } from "../../data";
import { classnames } from "../../utils/classnames";
import { AddIcon } from "../Icon/AddIcon";
import { SaveIcon } from "../Icon/SaveIcon";
import { Input } from "../Input";
import { InputField } from "../InputField";
import { StatusButton } from "../StatusButton";
import { StrataRoleSelect } from "../StrataRoleSelect";

interface Props {
  upsertStrataMembership: (fd: FormData) => void;
  className?: string;
  strataMembership?: StrataMembership & { name: string; email: string };
}

export function CreateOrUpdateStrataMembershipForm({
  className,
  strataMembership,
  upsertStrataMembership,
}: Props) {
  return (
    <form
      action={upsertStrataMembership}
      className={classnames(styles.upsertStrataMemberForm, className)}
    >
      <InputField
        name="name"
        type="text"
        placeholder="Name"
        defaultValue={strataMembership?.name}
      />

      <InputField
        name="unit"
        type="text"
        placeholder="Unit"
        defaultValue={strataMembership?.unit || undefined}
      />

      <InputField
        name="email"
        type="email"
        placeholder="Email Address"
        defaultValue={strataMembership?.email}
      />
      <InputField
        name="phone_number"
        type="text"
        placeholder="Phone #"
        defaultValue={strataMembership?.phoneNumber || undefined}
      />

      <StrataRoleSelect
        placeholder="Strata Role"
        name="role"
        defaultValue={strataMembership?.role || "owner"}
      />

      <StatusButton
        color="primary"
        iconRight={strataMembership ? <SaveIcon /> : <AddIcon />}
        type="submit"
      >
        {strataMembership ? "Update Member" : "Add Member"}
      </StatusButton>
    </form>
  );
}
