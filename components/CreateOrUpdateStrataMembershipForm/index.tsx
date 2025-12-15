"use client";

import { useRef } from "react";

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
  onUpsertMember?: () => void;
}

export function CreateOrUpdateStrataMembershipForm({
  className,
  children,
  membership,
  onUpsertMember,
}: React.PropsWithChildren<Props>) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const ref = useRef<HTMLFormElement>(null!);

  return (
    <form
      action={async (fd) => {
        await upsertStrataMembershipAction(membership?.userId, fd);
        onUpsertMember?.();
        ref.current.reset();
      }}
      className={classnames(className)}
      ref={ref}
    >
      <Stack>
        {children}

        <StatusButton
          color="primary"
          icon={membership ? <SaveIcon /> : <AddIcon />}
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
