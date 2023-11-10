import * as styles from "./style.css";

import { Button } from "../Button";
import { Input } from "../Input";
import { Select } from "../Select";
import { ElementGroup } from "../ElementGroup";
import { classnames } from "../../utils/classnames";
import { StrataMember } from "../../data/members/getStrataMembers";

interface Props {
  className?: string;
  upsertStrataMemberAction: (fd: FormData) => void;
  strataMember?: StrataMember;
  strataId: string;
}

export function UpsertStrataMemberForm({
  className,
  upsertStrataMemberAction,
  strataId,
  strataMember,
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
          defaultValue={strataMember?.name}
        />
        <Input
          name="unit"
          type="text"
          placeholder="Unit"
          defaultValue={strataMember?.unit}
        />

        <Input
          name="email"
          type="email"
          placeholder="Email"
          defaultValue={strataMember?.email}
        />
        <Input
          name="phone_number"
          type="text"
          placeholder="Phone #"
          defaultValue={strataMember?.phoneNumber}
        />

        <Select name="role" defaultValue={strataMember?.role || "owner"}>
          <option value="owner">Owner</option>
          <option value="treasurer">Treasurer</option>
          <option value="vice_president">Vice President</option>
          <option value="president">President</option>
        </Select>

        <Button type="submit">Add Member</Button>
      </ElementGroup>
    </form>
  );
}
