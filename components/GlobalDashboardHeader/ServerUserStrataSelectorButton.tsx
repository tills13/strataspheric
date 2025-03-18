import { auth } from "../../auth";
import { Strata } from "../../data";
import { getUserStratas } from "../../data/users/getUserStratas";
import { UserStrataSelectorButton } from "./UserStrataSelectorButton";

interface Props {
  currentStrata: Strata;
}

export async function ServerUserStrataSelectorButton({ currentStrata }: Props) {
  const session = await auth();
  const sessionStratas = session ? await getUserStratas(session.user.id) : [];

  return (
    <UserStrataSelectorButton
      currentStrata={currentStrata}
      sessionStratas={sessionStratas}
    />
  );
}
