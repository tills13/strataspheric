import * as styles from "./style.css";

import { StrataMembership } from "../../db";
import { classnames } from "../../utils/classnames";
import { Button } from "../Button";
import { ElementGroup } from "../ElementGroup";
import { Input } from "../Input";
import { StrataRoleSelect } from "../StrataRoleSelect";

interface Props {
  className?: string;
  upsertStrataMemberAction: (fd: FormData) => void;
  strataMembership?: StrataMembership;
  strataId: string;
}

export function UpsertStrataMemberForm({
  className,
  upsertStrataMemberAction,
  strataId,
  strataMembership,
}: Props) {
  return (
    <form
      className={classnames(styles.upsertStrataMemberForm, className)}
      action={upsertStrataMemberAction}
    >
      <input name="strata_id" type="hidden" defaultValue={strataId} />

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

        <Button type="submit">Add Member</Button>
      </ElementGroup>
    </form>
  );
}
