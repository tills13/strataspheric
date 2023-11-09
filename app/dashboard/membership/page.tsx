import { auth } from "../../../auth";
import { upsertStrataMember } from "../../../data/members/upsertStrataMember";
import { getStrataMembers, mustGetStrata } from "../../../data/stratas";

export default async function Page() {
  const session = await auth();

  const strata = await mustGetStrata();
  const members = await getStrataMembers(strata.id);

  return (
    <div>
      <h2>Members</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Unit</th>
            <th>Email</th>
            <th>Phone #</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td>{member.name}</td>
              <td>{member.unit}</td>
              <td>{member.email}</td>
              <td>{member.phoneNumber}</td>
              <td>{member.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {(session?.user as any).scope === "president" && (
        <form action={upsertStrataMember}>
          <input name="strata_id" type="hidden" defaultValue={strata.id} />

          <input name="name" type="text" placeholder="Name" />
          <input name="unit" type="text" placeholder="Unit" />
          <input name="email" type="text" placeholder="Email" />
          <input name="phone_number" type="text" placeholder="Phone #" />

          <select name="role" defaultValue="owner">
            <option value="owner">Owner</option>
            <option value="treasurer">Treasurer</option>
            <option value="vice_president">Vice President</option>
            <option value="president">President</option>
          </select>

          <button type="submit">Add Member</button>
        </form>
      )}
    </div>
  );
}
