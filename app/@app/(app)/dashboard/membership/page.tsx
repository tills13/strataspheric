import * as parentStyles from "../style.css";
import * as styles from "./styles.css";

import { notFound } from "next/navigation";
import React from "react";

import { auth } from "../../../../../auth";
import { ApproveStrataMembershipButton } from "../../../../../components/ApproveStrataMembershipButton";
import { Checkbox } from "../../../../../components/Checkbox";
import { Header } from "../../../../../components/Header";
import { RemoveButton } from "../../../../../components/RemoveButton";
import { StrataRoleSelect } from "../../../../../components/StrataRoleSelect";
import { UpsertStrataMemberForm } from "../../../../../components/UpsertStrataMemberForm";
import { StrataMembership } from "../../../../../data";
import { getStrataMembership } from "../../../../../data/strataMemberships/getStrataMembership";
import { getStrataPlan } from "../../../../../data/strataPlans/getStrataPlan";
import { getCurrentStrata } from "../../../../../data/stratas/getStrataByDomain";
import { can } from "../../../../../data/users/permissions";
import { pluralize } from "../../../../../utils/pluralize";
import { MembershipHeader } from "./MembershipHeader";
import {
  addStrataMemberAction,
  approveStrataMembershipAction,
  deleteStrataMemberAction,
  updateStrataMemberAction,
} from "./actions";

export const runtime = "edge";

export default async function Page() {
  const session = await auth();
  const strata = await getCurrentStrata();

  if (!strata) {
    notFound();
  }

  const plan = await getStrataPlan(strata.id);

  const canSeeMemberDetails = !!session;
  const canDelete = can(session?.user, "stratas.memberships.delete");
  const canUpsert = can(
    session?.user,
    "stratas.memberships.create",
    "stratas.memberships.edit",
  );

  const memberships = await getStrataMembership(strata.id, canUpsert);

  const numActivePaidSeats = memberships.reduce(
    (acc, curr) => (curr.isPaid ? acc + 1 : acc),
    0,
  );

  const byUnit: Record<string, StrataMembership[]> = {};

  for (const strataMemberships of memberships) {
    const unit =
      strataMemberships.role === "pending"
        ? "Pending"
        : !strataMemberships.unit
          ? "No Unit"
          : `Unit ${strataMemberships.unit}`;

    byUnit[unit] = byUnit[unit] || [];
    byUnit[unit].push(strataMemberships);
  }

  return (
    <>
      <MembershipHeader
        addStrataMember={addStrataMemberAction.bind(undefined, strata.id)}
      />
      <div className={parentStyles.pageContainerFullWidthMobile}>
        <div className={styles.pageContainer}>
          <div className={styles.leftColumn}>
            <div className={styles.membershipTableContainer}>
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
                      <th>Paid Seat</th>

                      {canDelete && <th></th>}
                    </tr>

                    {strataMemberships.map((membership) => (
                      <tr key={membership.userId}>
                        <td>{membership.name}</td>
                        <td>
                          {canSeeMemberDetails
                            ? membership.email
                            : "****@***.***"}
                        </td>
                        <td>
                          {canSeeMemberDetails
                            ? membership.phoneNumber
                            : "***-***-****"}
                        </td>
                        <td>
                          {membership.role === "pending" ? (
                            <ApproveStrataMembershipButton
                              approveStrataMembership={approveStrataMembershipAction.bind(
                                undefined,
                                strata.id,
                                membership.userId,
                              )}
                            />
                          ) : canUpsert ? (
                            <form
                              action={updateStrataMemberAction.bind(
                                undefined,
                                strata.id,
                                membership.userId,
                              )}
                            >
                              <StrataRoleSelect
                                name="role"
                                defaultValue={membership.role || "owner"}
                                submitOnChange
                              />
                            </form>
                          ) : (
                            membership.role
                          )}
                        </td>
                        <td>
                          <Checkbox defaultChecked={membership.isPaid === 1} />
                        </td>
                        {canDelete && (
                          <td
                            className={styles.membershipTableActionColumnCell}
                          >
                            <RemoveButton
                              onClick={deleteStrataMemberAction.bind(
                                undefined,
                                strata.id,
                                membership.userId,
                              )}
                              size="small"
                            />
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                ))}
              </table>
            </div>

            {/* <div className={styles.seatCountContainer}>
              <Header priority={3}>You are using</Header>
              <span className={styles.seatCountEmphasis}>
                {numActivePaidSeats}
              </span>{" "}
              of{" "}
              <span className={styles.seatCountEmphasis}>{plan?.numSeats}</span>{" "}
              paid {pluralize("seat", plan?.numSeats || 0)}
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
