import * as styles from "./style.css";

import { StrataMembership } from "../../data";
import { classnames } from "../../utils/classnames";
import { AddIcon } from "../Icon/AddIcon";
import { SaveIcon } from "../Icon/SaveIcon";
import { Input } from "../Input";
import { Stack } from "../Stack";
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
    <form action={upsertStrataMembership} className={classnames(className)}>
      <Stack>
        <Input
          name="name"
          type="text"
          label="Name"
          defaultValue={strataMembership?.name}
          required
        />

        <Input
          name="unit"
          type="text"
          label="Unit"
          defaultValue={strataMembership?.unit || undefined}
          required
        />

        <Input
          name="email"
          type="email"
          label="Email Address"
          defaultValue={strataMembership?.email}
          required
        />

        <Input
          name="phone_number"
          type="text"
          label="Phone #"
          defaultValue={strataMembership?.phoneNumber || undefined}
        />

        <StrataRoleSelect
          label="Strata Role"
          name="role"
          defaultValue={strataMembership?.role || "owner"}
          required
        />

        <StatusButton
          color="primary"
          iconRight={strataMembership ? <SaveIcon /> : <AddIcon />}
          type="submit"
        >
          {strataMembership
            ? strataMembership.role === "pending"
              ? "Approve Member"
              : "Update Member"
            : "Add Member"}
        </StatusButton>
      </Stack>
    </form>
  );
}
