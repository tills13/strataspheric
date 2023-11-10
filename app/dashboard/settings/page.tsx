import * as styles from "./styles.css";
import * as parentStyles from "../style.css";

import { auth } from "../../../auth";
import { updateStrataAction } from "./actions";
import { can } from "../../../data/members/permissions";
import { Header } from "../../../components/Header";
import { redirect } from "next/navigation";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { Checkbox } from "../../../components/Checkbox";
import { ElementGroup } from "../../../components/ElementGroup";
import { mustGetCurrentStrata } from "../../../data/stratas/getStrata";

export const runtime = "edge";

export default async function Page() {
  const session = await auth();
  const strata = await mustGetCurrentStrata();

  if (!can(session?.user, "stratas.edit")) {
    redirect("/dashboard");
  }

  return (
    <div className={parentStyles.pageContainer}>
      <Header className={styles.pageTitle} priority={2}>
        Settings
      </Header>

      <form className={styles.form} action={updateStrataAction}>
        <ElementGroup orientation="column">
          <input name="strata_id" type="hidden" defaultValue={strata.id} />
          <Input name="name" defaultValue={strata.name} />

          <label className={styles.visibilityLabel} htmlFor="is_public">
            Visible to public
            <Checkbox
              id="is_public"
              name="is_public"
              defaultChecked={strata.visibility === "public"}
            />
          </label>
          <Button type="submit">Update Strata</Button>
        </ElementGroup>
      </form>
    </div>
  );
}
