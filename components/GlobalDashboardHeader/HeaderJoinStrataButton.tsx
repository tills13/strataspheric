import { joinStrataAction } from "../../app/@app/actions";
import { auth } from "../../auth";
import { getStrataMembership } from "../../data/strataMemberships/getStrataMembership";
import { mustGetCurrentStrata } from "../../data/stratas/getStrataByDomain";
import { JoinStrataButton } from "../JoinStrataButton";

export async function HeaderJoinStrataButton() {
  const session = await auth();
  const strata = await mustGetCurrentStrata();
  const strataMemebership = session?.user.id
    ? await getStrataMembership(strata.id, session?.user.id)
    : undefined;

  return (
    <JoinStrataButton
      buttonStyle="primary"
      joinStrata={joinStrataAction}
      strata={strata}
      strataMembership={strataMemebership}
      user={session?.user}
    />
  );
}
