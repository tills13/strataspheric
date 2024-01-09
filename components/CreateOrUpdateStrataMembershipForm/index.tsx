import * as styles from "./style.css";

import { StrataMembership } from "../../data";
import { classnames } from "../../utils/classnames";
import { ElementGroup } from "../ElementGroup";
import { AddIcon } from "../Icon/AddIcon";
import { SaveIcon } from "../Icon/SaveIcon";
import { Input } from "../Input";
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
      <ElementGroup gap="small" orientation="column">
        <Input
          name="name"
          type="text"
          placeholder="Name"
          defaultValue={strataMembership?.name}
        />

        <Input
          name="unit"
          type="text"
          placeholder="Unit"
          defaultValue={strataMembership?.unit || undefined}
        />

        <Input
          name="email"
          type="email"
          placeholder="Email"
          defaultValue={strataMembership?.email}
        />
        <Input
          name="phone_number"
          type="text"
          placeholder="Phone #"
          defaultValue={strataMembership?.phoneNumber || undefined}
        />

        <StrataRoleSelect
          name="role"
          defaultValue={strataMembership?.role || "owner"}
        />

        <StatusButton
          color="primary"
          iconRight={strataMembership ? <AddIcon /> : <SaveIcon />}
          type="submit"
        >
          {strataMembership ? "Update Member" : "Add Member"}
        </StatusButton>
      </ElementGroup>
    </form>
  );
}
