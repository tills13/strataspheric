import { upsertStrataMembershipAction } from "../../app/@app/dashboard/membership/actions";
import { StrataMembership } from "../../data/memberships/getStrataMembership";
import { classnames } from "../../utils/classnames";
import { AddIcon } from "../Icon/AddIcon";
import { SaveIcon } from "../Icon/SaveIcon";
import { Stack } from "../Stack";
import { StatusButton } from "../StatusButton";

interface Props {
  className?: string;
  membership?: StrataMembership;
  strataRoleSelectDisabled?: boolean;
}

export function CreateOrUpdateStrataMembershipForm({
  className,
  children,
  membership,
}: React.PropsWithChildren<Props>) {
  return (
    <form
      action={upsertStrataMembershipAction.bind(undefined, membership?.userId)}
      className={classnames(className)}
    >
      <Stack>
        {children}

        <StatusButton
          color="primary"
          iconRight={membership ? <SaveIcon /> : <AddIcon />}
          type="submit"
        >
          {membership
            ? membership.role === "pending"
              ? "Approve Member"
              : "Update Member"
            : "Add Member"}
        </StatusButton>
      </Stack>
    </form>
  );
}
