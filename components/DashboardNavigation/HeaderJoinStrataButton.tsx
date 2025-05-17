import { auth } from "../../auth";
import { getStrataMembership } from "../../data/memberships/getStrataMembership";
import { mustGetCurrentStrata } from "../../data/stratas/getStrataByDomain";
import { JoinStrataButton } from "../JoinStrataButton";

export async function HeaderJoinStrataButton() {
  const [session, strata] = await Promise.all([auth(), mustGetCurrentStrata()]);

  if (session?.user && session?.user.scopes.length !== 0) {
    return null;
  }

  const strataMemebership = session?.user.id
    ? await getStrataMembership(strata.id, session.user.id)
    : undefined;

  return (
    <JoinStrataButton
      buttonStyle="tertiary"
      buttonColor="primary"
      strata={strata}
      membership={strataMemebership}
      user={session?.user}
    />
  );
}
