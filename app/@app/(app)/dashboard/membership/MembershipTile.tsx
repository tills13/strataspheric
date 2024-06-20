"use client";

import * as styles from "./styles.css";

import { useState } from "react";

import { Button } from "../../../../../components/Button";
import { CreateOrUpdateStrataMembershipForm } from "../../../../../components/CreateOrUpdateStrataMembershipForm";
import { Header } from "../../../../../components/Header";
import { EditIcon } from "../../../../../components/Icon/EditIcon";
import { RemoveIcon } from "../../../../../components/Icon/RemoveIcon";
import { Modal } from "../../../../../components/Modal";
import { StatusButton } from "../../../../../components/StatusButton";
import { StrataMembership, User } from "../../../../../data";
import { can, p } from "../../../../../data/users/permissions";
import { useCan } from "../../../../../hooks/useCan";
import { classnames } from "../../../../../utils/classnames";

interface Props {
  deleteMember: (memberId: string, fd: FormData) => any;
  className?: string;
  membership: StrataMembership & User;
  upsertMember: (memberId: string, fd: FormData) => any;
}

export function MembershipTile({
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
            <span>Unit {membership.unit}</span>
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
          <dd className={styles.membershipTileDd}>{membership.email}</dd>
          <dt className={styles.membershipTileDt}>Phone</dt>
          <dd className={styles.membershipTileDd}>{membership.phoneNumber}</dd>
          <dt className={styles.membershipTileDt}>Role</dt>
          <dd className={styles.membershipTileDd}>{membership.role}</dd>
        </dl>
      </div>
      {showEditModal && (
        <Modal closeModal={() => setShowEditModal(false)}>
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
