"use client";

import { useEffect, useRef, useState } from "react";

import { upsertStrataMembershipAction } from "../../app/@app/dashboard/membership/actions";
import { StrataMembership } from "../../data/memberships/getStrataMembership";
import * as styles from "./style.css";
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
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isStuck, setIsStuck] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsStuck(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

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

        <div
          className={classnames(
            styles.stickySubmit,
            isStuck && styles.stickySubmitStuck,
          )}
        >
          <StatusButton
            color="primary"
            icon={membership ? <SaveIcon /> : <AddIcon />}
            type="submit"
            fullWidth
          >
            {membership ? "Update Member" : "Add Member"}
          </StatusButton>
        </div>
        <div ref={sentinelRef} />
      </Stack>
    </form>
  );
}
