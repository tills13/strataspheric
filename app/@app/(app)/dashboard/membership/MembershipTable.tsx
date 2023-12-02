"use client";

import * as styles from "./styles.css";

import { useSession } from "next-auth/react";
import { startTransition } from "react";

import { ApproveStrataMembershipButton } from "../../../../../components/ApproveStrataMembershipButton";
import { RemoveButton } from "../../../../../components/RemoveButton";
import { StrataRoleSelect } from "../../../../../components/StrataRoleSelect";
import { StrataMembership, User } from "../../../../../data";
import { can } from "../../../../../data/users/permissions";

interface Props {
  approveStrataMembership: (userId: string) => void;
  removeStrataMember: (userId: string) => void;
  memberships: Array<StrataMembership & User>;
  updateStrataMember: (userId: string, formData: FormData) => void;
}

export function MembershipTable({
  approveStrataMembership,
  removeStrataMember,
  memberships,
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
            <th>Phone #</th>
            <th>Role</th>

            {canDelete && <th></th>}
          </tr>

          {strataMemberships.map((membership) => (
            <tr key={membership.userId}>
              <td>{membership.name}</td>
              <td>{canSeeMemberDetails ? membership.email : "****@***.***"}</td>
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
