import * as parentStyles from "../style.css";

import { notFound } from "next/navigation";

import { getCurrentStrata } from "../../../../../data/stratas/getStrataByDomain";
import { MeetingsHeader } from "./MeetingsHeader";
import { MeetingListLayout } from "./MeetingsListLayout";
import { createMeetingAction } from "./actions";

export const runtime = "edge";

export default async function Page() {
  const strata = await getCurrentStrata();

  if (!strata) {
    notFound();
  }

  return (
    <>
      <MeetingsHeader
        createMeeting={createMeetingAction.bind(undefined, strata.id)}
      />

      <MeetingListLayout strataId={strata.id} />
    </>
  );
}
