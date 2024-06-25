"use client";

import * as styles from "./styles.css";

import { useSession } from "next-auth/react";
import { useState } from "react";

import { ApproveStrataMembershipButton } from "../../../../components/ApproveStrataMembershipButton";
import { Button } from "../../../../components/Button";
import { CreateOrUpdateStrataMembershipForm } from "../../../../components/CreateOrUpdateStrataMembershipForm";
import { CircleCheckIcon } from "../../../../components/Icon/CircleCheckIcon";
import { EditIcon } from "../../../../components/Icon/EditIcon";
import { Modal } from "../../../../components/Modal";
import { RemoveButton } from "../../../../components/RemoveButton";
import { StrataMembership, User } from "../../../../data";
import { can } from "../../../../data/users/permissions";

interface Props {
  approveStrataMembership: (userId: string) => void;
  memberships: Array<StrataMembership & User>;
  removeStrataMembership: (userId: string) => void;
  upsertStrataMembership: (userId: string, formData: FormData) => void;
}

export function MembershipTable({
  approveStrataMembership,
  memberships,
  removeStrataMembership,
  upsertStrataMembership,
}: Props) {
  const [selectedMembership, setSelectedMembership] = useState<
    StrataMembership & User
  >();
  const { data: session } = useSession();

  const canSeeMemberDetails = !!session;
  const canDelete = can(session?.user, "stratas.memberships.delete");

  const byUnit: Record<string, Array<StrataMembership & User>> = {};

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
    <>
      <table className={styles.membershipGrid}>
        {Object.entries(byUnit).map(([unit, strataMemberships]) => (
          <tbody key={unit} className={styles.membershipTableSection}>
            <tr className={styles.membershipTableSectionHeaderRow}>
              <th colSpan={canDelete ? 6 : 5}>{unit}</th>
            </tr>

            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Unit</th>
              <th>Phone #</th>
              <th>Role</th>

              {canDelete && <th></th>}
            </tr>

            {strataMemberships.map((membership) => (
              <tr key={membership.userId}>
                <td>{membership.name}</td>
                <td>
                  {canSeeMemberDetails ? membership.email : "****@***.***"}
                </td>

                <td>{membership.unit}</td>

                <td>
                  {canSeeMemberDetails
                    ? membership.phoneNumber
                    : "***-***-****"}
                </td>
                <td>{membership.role}</td>
                {canDelete && (
                  <td className={styles.membershipTableActionColumnCell}>
                    <div className={styles.actionsContainer}>
                      {membership.role === "pending" && (
                        <ApproveStrataMembershipButton
                          approveStrataMembership={approveStrataMembership.bind(
                            undefined,
                            membership.userId,
                          )}
                          color="success"
                          iconRight={<CircleCheckIcon />}
                          iconTextBehaviour="centerRemainder"
                          size="small"
                        />
                      )}
                      <Button
                        icon={<EditIcon />}
                        onClick={() => setSelectedMembership(membership)}
                        style="tertiary"
                        size="small"
                      />
                      <RemoveButton
                        action={removeStrataMembership.bind(
                          undefined,
                          membership.userId,
                        )}
                        color="error"
                        style="tertiary"
                        size="small"
                      />
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        ))}
      </table>
      {selectedMembership && (
        <Modal
          closeModal={() => setSelectedMembership(undefined)}
          title="Edit Membership"
        >
          <CreateOrUpdateStrataMembershipForm
            upsertStrataMembership={upsertStrataMembership.bind(
              undefined,
              selectedMembership.userId,
            )}
            strataMembership={selectedMembership}
          />
        </Modal>
      )}
    </>
  );
}
