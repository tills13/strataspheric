import * as styles from "./styles.css";
import * as parentStyles from "../style.css";

import { auth } from "../../../../auth";
import {
  StrataMember,
  getStrataMembers,
} from "../../../../data/members/getStrataMembers";
import {
  approveStrataMembershipAction,
  deleteStrataMemberAction,
  createStrataMemberAction,
} from "./actions";
import { can } from "../../../../data/members/permissions";
import { RemoveButton } from "../../../../components/RemoveButton";
import { Header } from "../../../../components/Header";
import { UpsertStrataMemberForm } from "../../../../components/UpsertStrataMemberForm";
import { ApproveStrataMembershipButton } from "../../../../components/ApproveStrataMembershipButton";

import { mustGetCurrentStrata } from "../../../../data/stratas/getStrata";
import React from "react";
import { Checkbox } from "../../../../components/Checkbox";
import { getPlan } from "../../../../data/plans/getPlan";
import { pluralize } from "../../../../utils/pluralize";

export const runtime = "edge";

export default async function Page() {
  const session = await auth();
  const strata = await mustGetCurrentStrata();
  const plan = await getPlan(strata.id);

  const canSeeMemberDetails = !!session;
  const canDelete = can(session?.user, "stratas.members.delete");
  const canUpsert = can(
    session?.user,
    "stratas.members.create",
    "stratas.members.edit"
  );

  const members = await getStrataMembers(strata.id, canUpsert);

  const numActivePaidSeats = members.reduce(
    (acc, curr) => (curr.isPaid ? acc + 1 : acc),
    0
  );

  const byUnit: Record<string, StrataMember[]> = {};

  for (const strataMember of members) {
    const unit =
      strataMember.role === "pending"
        ? "Pending"
        : !strataMember.unit
        ? "No Unit"
        : `Unit ${strataMember.unit}`;

    byUnit[unit] = byUnit[unit] || [];
    byUnit[unit].push(strataMember);
  }

  return (
    <div className={parentStyles.pageContainerFullWidthMobile}>
      <div className={styles.pageContainer}>
        <div className={styles.leftColumn}>
          <div className={styles.membershipTableContainer}>
            <table className={styles.membershipTable}>
              {Object.entries(byUnit).map(([unit, strataMembers]) => (
                <tbody key={unit} className={styles.membershipTableSection}>
                  <tr className={styles.membershipTableSectionHeaderRow}>
                    <th colSpan={canDelete ? 6 : 5}>{unit}</th>
                  </tr>

                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone #</th>
                    <th>Role</th>
                    <th>Paid Seat</th>

                    {canDelete && <th></th>}
                  </tr>

                  {strataMembers.map((member) => (
                    <tr key={member.id}>
                      <td>{member.name}</td>
                      <td>
                        {canSeeMemberDetails ? member.email : "****@***.***"}
                      </td>
                      <td>
                        {canSeeMemberDetails
                          ? member.phoneNumber
                          : "***-***-****"}
                      </td>
                      <td>
                        {member.role === "pending" ? (
                          <ApproveStrataMembershipButton
                            approveStrataMembership={approveStrataMembershipAction.bind(
                              undefined,
                              strata.id,
                              member.id
                            )}
                          />
                        ) : (
                          member.role
                        )}
                      </td>
                      <td>
                        <Checkbox defaultChecked={member.isPaid} />
                      </td>
                      {canDelete && (
                        <td className={styles.membershipTableActionColumnCell}>
                          <RemoveButton
                            onClick={deleteStrataMemberAction.bind(
                              undefined,
                              strata.id,
                              member.id
                            )}
                          />
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>

          <div className={styles.seatCountContainer}>
            <Header priority={3}>You are using</Header>
            <span className={styles.seatCountEmphasis}>
              {numActivePaidSeats}
            </span>{" "}
            of{" "}
            <span className={styles.seatCountEmphasis}>{plan?.numSeats}</span>{" "}
            paid {pluralize("seat", plan?.numSeats || 0)}
          </div>
        </div>

        {canUpsert && (
          <div>
            <Header className={styles.pageSecondaryTitle} priority={3}>
              Add New Member
            </Header>
            <UpsertStrataMemberForm
              className={styles.addMemberForm}
              strataId={strata.id}
              upsertStrataMemberAction={createStrataMemberAction}
            />
          </div>
        )}
      </div>
    </div>
  );
}
