import * as styles from "./styles.css";
import * as parentStyles from "../style.css";

import { auth } from "../../../../../auth";
import { updateStrataAction } from "./actions";
import { can } from "../../../../../data/members/permissions";
import { Header } from "../../../../../components/Header";
import { notFound, redirect } from "next/navigation";
import { Input } from "../../../../../components/Input";
import { Button } from "../../../../../components/Button";
import { Checkbox } from "../../../../../components/Checkbox";
import { ElementGroup } from "../../../../../components/ElementGroup";
import { getCurrentStrata } from "../../../../../data/stratas/getStrata";

export const runtime = "edge";

export default async function Page() {
  const session = await auth();
  const strata = await getCurrentStrata();

  if (!strata) {
    notFound();
  }

  if (!can(session?.user, "stratas.edit")) {
    redirect("/dashboard");
  }

  return (
    <div className={parentStyles.pageContainer}>
      <form className={styles.form} action={updateStrataAction}>
        <ElementGroup orientation="column">
          <input name="id" type="hidden" defaultValue={strata.id} />

          <Header priority={3}>Strata Name</Header>
          <Input name="name" defaultValue={strata.name} />

          <label className={styles.isPublicField} htmlFor="is_public">
            <Header priority={3}>
              I want my strata's content to be public
            </Header>
            <Checkbox
              id="is_public"
              name="is_public"
              defaultChecked={strata.isPublic}
            />
          </label>

          <Header priority={3}>Strata ID</Header>
          <Input
            name="strata_id"
            placeholder="Strata ID (e.g. VIS...)"
            required
          />

          <Header priority={3}>Address</Header>

          <Input
            name="strata_address_street_address"
            placeholder="Street Address"
            required
          />

          <Input
            name="strata_address_postal_code"
            placeholder="Postal Code"
            required
          />

          <Input
            name="strata_address_province_state"
            placeholder="Province / State"
            required
          />
          <Button type="submit">Update Strata</Button>
        </ElementGroup>
      </form>
    </div>
  );
}
