import { notFound } from "next/navigation";

import { DashboardHeader } from "../../../../../components/DashboardHeader";
import { getCurrentStrata } from "../../../../../data/stratas/getStrataByDomain";
import { MeetingLayout } from "./MeetingLayout";

export const runtime = "edge";

export default async function Page({
  params,
}: {
  params: { meetingId: string };
}) {
  const strata = await getCurrentStrata();

  if (!strata) {
    notFound();
  }

  return (
    <>
      <DashboardHeader />
      <MeetingLayout meetingId={params.meetingId} strataId={strata.id} />
    </>
  );
}
