import { headers } from "next/headers";
import { db } from "../db";
import { redirect } from "next/navigation";
import { Member } from "./members";
import { uuidv7 } from "uuidv7";
import { getMember } from "./members/getMember";

export interface Strata {
  id: string;
  name: string;
  domain: string;
}

export function getStrata(): Promise<Strata | null> {
  const h = headers().get("host");

  if (!db()) {
    return Promise.resolve({
      domain: h!,
      id: "018bb101-dc78-761b-ba86-2f4914bfd820",
      name: "Test",
    });
  }

  return db().prepare("SELECT * FROM stratas WHERE domain = ?").bind(h).first();
}

export async function mustGetStrata(): Promise<Strata> {
  const strata = await getStrata();

  if (!strata) {
    redirect("/");
  }

  return strata;
}

interface GetStrataMembersRow {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  unit: string;
  role: string;
}

export async function getStrataMembers(strataId: string): Promise<Member[]> {
  if (!db()) {
    return Promise.resolve([
      {
        email: "tills13@gmail.com",
        id: "018bb102-52c1-792d-b951-de3d36ba1208",
        name: "Tyler Sebastian",
        phoneNumber: "778-676-4774",
        role: "president",
        unit: "1",
      },
    ]);
  }

  const result = await db()
    .prepare(
      `
        SELECT 
            members.id, 
            members.name, 
            members.email, 
            members.phone_number,
            strata_membership.unit,
            strata_membership.role
        FROM strata_membership 
        JOIN members ON strata_membership.member_id = members.id
        WHERE strata_id = ?
    `
    )
    .bind(strataId)
    .all<GetStrataMembersRow>();

  return (
    result.results.map((row) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      phoneNumber: row.phone_number,
      unit: row.unit,
      role: row.role,
    })) || []
  );
}
