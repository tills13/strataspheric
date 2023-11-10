import * as styles from "./styles.css";
import * as parentStyles from "../style.css";

import { auth } from "../../../auth";
import { mustGetStrata } from "../../../data/stratas";
import { getStrataMembers } from "../../../data/members/getStrataMembers";
import {
  approveStrataMembershipAction,
  deleteStrataMemberAction,
  createStrataMemberAction,
} from "./actions";
import { can } from "../../../data/members/permissions";
import { RemoveButton } from "../../../components/RemoveButton";
import { Header } from "../../../components/Header";
import { UpsertStrataMemberForm } from "../../../components/UpsertStrataMemberForm";
import { ApproveStrataMembershipButton } from "../../../components/ApproveStrataMembershipButton";
import { ElementGroup } from "../../../components/ElementGroup";

export const runtime = "edge";

export default async function Page() {
  const session = await auth();
  const strata = await mustGetStrata();
  const members = await getStrataMembers(strata.id);

  const canDelete = can(session?.user, "stratas.members.delete");
  const canUpsert = can(
    session?.user,
    "stratas.members.create",
    "stratas.members.edit"
  );

  return (
    <div className={parentStyles.pageContainer}>
      <Header className={styles.header} priority={2}>
        Members
      </Header>

      <div className={styles.pageContainer}>
        {canUpsert && (
          <UpsertStrataMemberForm
            className={styles.addMemberForm}
            strataId={strata.id}
            upsertStrataMemberAction={createStrataMemberAction}
          />
        )}
        <table className={styles.membershipTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Unit</th>
              <th>Email</th>
              <th>Phone #</th>
              <th>Role</th>
              {canDelete && <th></th>}
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id}>
                <td>{member.name}</td>
                <td>{member.unit}</td>
                <td>{member.email}</td>
                <td>{member.phoneNumber}</td>
                <td>
                  {member.role}
                  {canUpsert && member.role === "pending" && (
                    <ApproveStrataMembershipButton
                      approveStrataMembership={approveStrataMembershipAction.bind(
                        undefined,
                        strata.id,
                        member.id
                      )}
                    />
                  )}
                </td>
                {canDelete && (
                  <td>
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
        </table>
      </div>
    </div>
  );
}
