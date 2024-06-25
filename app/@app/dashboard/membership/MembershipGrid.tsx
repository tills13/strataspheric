import * as styles from "./styles.css";

import { StrataMembership, User } from "../../../../data";
import { classnames } from "../../../../utils/classnames";
import { MembershipTile } from "./MembershipTile";
import {
  approveStrataMembershipAction,
  deleteStrataMembershipAction,
  upsertStrataMembershipAction,
} from "./actions";

interface Props {
  className?: string;
  memberships: Array<StrataMembership & User>;
}

export function MembershipGrid({ className, memberships }: Props) {
  return (
    <div className={classnames(className, styles.membershipGrid)}>
      {memberships.map((membership) => (
        <MembershipTile
          approveStrataMembership={approveStrataMembershipAction}
          key={membership.id}
          deleteMember={deleteStrataMembershipAction}
          membership={membership}
          upsertMember={upsertStrataMembershipAction}
        />
      ))}
    </div>
  );
}
