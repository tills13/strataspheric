import { mustAuth } from "../../auth";
import { Strata } from "../../data";
import { getUserStratas } from "../../data/users/getUserStratas";
import { UserStrataSelector } from "./UserStrataSelector";

interface Props {
  currentStrata: Strata;
}

export async function ServerUserStrataSelector({ currentStrata }: Props) {
  const sessionStratas = await mustAuth().then((session) =>
    getUserStratas(session.user.id),
  );

  return (
    <UserStrataSelector
      currentStrata={currentStrata}
      sessionStratas={sessionStratas}
    />
  );
}
