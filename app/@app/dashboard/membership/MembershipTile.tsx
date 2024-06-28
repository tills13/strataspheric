"use client";

import { s } from "../../../../sprinkles.css";
import * as styles from "./styles.css";

import { useState } from "react";

import { ApproveStrataMembershipButton } from "../../../../components/ApproveStrataMembershipButton";
import { Button } from "../../../../components/Button";
import { CreateOrUpdateStrataMembershipForm } from "../../../../components/CreateOrUpdateStrataMembershipForm";
import { Header } from "../../../../components/Header";
import { EditIcon } from "../../../../components/Icon/EditIcon";
import { RemoveIcon } from "../../../../components/Icon/RemoveIcon";
import { Modal } from "../../../../components/Modal";
import { Bone } from "../../../../components/Skeleton/Bone";
import { StatusButton } from "../../../../components/StatusButton";
import { StrataMembership, User } from "../../../../data";
import { can, p } from "../../../../data/users/permissions";
import { useCan } from "../../../../hooks/useCan";
import { classnames } from "../../../../utils/classnames";

interface Props {
  approveStrataMembership: (membershipId: string) => void;
  deleteMember: (userId: string) => any;
  className?: string;
  membership: StrataMembership & User;
  upsertMember: (userId: string, fd: FormData) => any;
}

export function MembershipTile({
  approveStrataMembership,
  className,
  deleteMember,
  membership,
  upsertMember,
}: Props) {
  const [showEditModal, setShowEditModal] = useState(false);
  const can = useCan();

  return (
    <>
      <div className={classnames(className, styles.membershipTile)}>
        <div className={styles.membershipTileHeader}>
          <div>
            <Header priority={2}>{membership.name}</Header>
            {membership.unit && <span>Unit {membership.unit}</span>}
          </div>

          <div className={styles.membershipTileActions}>
            {can(p("stratas", "memberships", "edit")) && (
              <Button
                icon={<EditIcon />}
                onClick={() => setShowEditModal(true)}
                size="small"
                style="tertiary"
              />
            )}
            {can(p("stratas", "memberships", "delete")) &&
              membership.role !== "administrator" && (
                <StatusButton
                  action={deleteMember.bind(undefined, membership.userId)}
                  icon={<RemoveIcon />}
                  style="tertiary"
                  color="error"
                  size="small"
                />
              )}
          </div>
        </div>

        <dl className={styles.membershipTileDetails}>
          <dt className={styles.membershipTileDt}>Email</dt>
          <dd className={styles.membershipTileDd}>
            {can(p("stratas", "memberships", "view"))
              ? membership.email
              : "*****@*****.***"}
          </dd>
          {membership.phoneNumber && (
            <>
              <dt className={styles.membershipTileDt}>Phone</dt>
              <dd className={styles.membershipTileDd}>
                {membership.phoneNumber}
              </dd>
            </>
          )}
          <dt className={styles.membershipTileDt}>Role</dt>
          <dd className={styles.membershipTileDd}>{membership.role}</dd>
        </dl>

        {membership.role === "pending" &&
          can(p("stratas", "memberships", "edit")) && (
            <ApproveStrataMembershipButton
              approveStrataMembership={approveStrataMembership.bind(
                undefined,
                membership.id,
              )}
              className={s({ mt: "normal" })}
            />
          )}
      </div>
      {showEditModal && (
        <Modal
          closeModal={() => setShowEditModal(false)}
          title={`Update ${membership.name}`}
        >
          <CreateOrUpdateStrataMembershipForm
            strataMembership={membership}
            upsertStrataMembership={upsertMember.bind(
              undefined,
              membership.userId,
            )}
          />
        </Modal>
      )}
    </>
  );
}
