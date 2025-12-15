import { Badge } from "../Badge";

const DECISION_TO_LEVEL: Record<
  string,
  React.ComponentProps<typeof Badge>["level"]
> = { approved: "success", rejected: "error" };

interface Props {
  decision: "approved" | "rejected" | null;
}

export function BookingStatusBadge({ decision }: Props) {
  const level =
    (decision ? DECISION_TO_LEVEL[decision] : undefined) ?? "warning";

  const text = decision
    ? decision[0].toUpperCase() + decision.substring(1)
    : "Pending";

  return <Badge level={level}>{text}</Badge>;
}
