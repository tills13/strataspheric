"use client";

import * as buttonStyles from "../../../../../components/Button/style.css";
import * as iconButtonStyles from "../../../../../components/IconButton/style.css";
import * as styles from "./styles.css";

import { useSession } from "next-auth/react";
import { startTransition } from "react";

import { ApproveStrataMembershipButton } from "../../../../../components/ApproveStrataMembershipButton";
import { Input } from "../../../../../components/Input";
import { RemoveButton } from "../../../../../components/RemoveButton";
import { StrataRoleSelect } from "../../../../../components/StrataRoleSelect";
import { StrataMembership, User } from "../../../../../data";
import { can } from "../../../../../data/users/permissions";
import { classnames } from "../../../../../utils/classnames";

interface Props {
  approveStrataMembership: (userId: string) => void;
  memberships: Array<StrataMembership & User>;
  removeStrataMember: (userId: string) => void;
  updateStrataMember: (userId: string, formData: FormData) => void;
}

export function MembershipTable({
  approveStrataMembership,
  memberships,
  removeStrataMember,
  updateStrataMember,
}: Props) {
  const { data: session } = useSession();

  const canSeeMemberDetails = !!session;
  const canDelete = can(session?.user, "stratas.memberships.delete");
  const canUpsert = can(
    session?.user,
    "stratas.memberships.create",
    "stratas.memberships.edit",
  );

  const byUnit: Record<string, StrataMembership[]> = {};

  for (const membership of memberships) {
    const unit =
      membership.role === "pending"
        ? "Pending"
        : !membership.unit
          ? "No Unit"
          : `Unit ${membership.unit}`;

    byUnit[unit] = byUnit[unit] || [];
    byUnit[unit].push(membership);
  }

  return (
    <table className={styles.membershipTable}>
      {Object.entries(byUnit).map(([unit, strataMemberships]) => (
        <tbody key={unit} className={styles.membershipTableSection}>
          <tr className={styles.membershipTableSectionHeaderRow}>
            <th colSpan={canDelete ? 6 : 5}>{unit}</th>
          </tr>

          <tr>
            <th>Name</th>
            <th>Email</th>
            {canUpsert && <th>Unit</th>}
            <th>Phone #</th>
            <th>Role</th>

            {canDelete && <th></th>}
          </tr>

          {strataMemberships.map((membership) => (
            <tr key={membership.userId}>
              <td>{membership.name}</td>
              <td>{canSeeMemberDetails ? membership.email : "****@***.***"}</td>
              {canUpsert && (
                <td>
                  <Input
                    onBlur={(e) =>
                      startTransition(() => {
                        const fd = new FormData();
                        fd.set("unit", e.target.value);

                        updateStrataMember(membership.userId, fd);
                      })
                    }
                    defaultValue={membership.unit || ""}
                  />
                </td>
              )}
              <td>
                {canSeeMemberDetails ? membership.phoneNumber : "***-***-****"}
              </td>
              <td>
                {membership.role === "pending" ? (
                  <ApproveStrataMembershipButton
                    approveStrataMembership={approveStrataMembership.bind(
                      undefined,
                      membership.userId,
                    )}
                  />
                ) : canUpsert ? (
                  <StrataRoleSelect
                    name="role"
                    defaultValue={membership.role || "owner"}
                    onChange={(e) =>
                      startTransition(() => {
                        const fd = new FormData();
                        fd.set("role", e.target.value);

                        updateStrataMember(membership.userId, fd);
                      })
                    }
                  />
                ) : (
                  membership.role
                )}
              </td>
              {canDelete && (
                <td className={styles.membershipTableActionColumnCell}>
                  <RemoveButton
                    className={classnames(
                      iconButtonStyles.iconButton,
                      iconButtonStyles.iconButtonSizes.small,
                      buttonStyles.buttonVariants.tertiary,
                    )}
                    onClick={removeStrataMember.bind(
                      undefined,
                      membership.userId,
                    )}
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      ))}
    </table>
  );
}
