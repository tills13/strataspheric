"use client";

import { s } from "../../../../sprinkles.css";
import * as styles from "./styles.css";

import { useState } from "react";

import { ApproveStrataMembershipButton } from "../../../../components/ApproveStrataMembershipButton";
import { Button } from "../../../../components/Button";
import { CreateOrUpdateStrataMembershipForm } from "../../../../components/CreateOrUpdateStrataMembershipForm";
import { Group } from "../../../../components/Group";
import { Header } from "../../../../components/Header";
import { EditIcon } from "../../../../components/Icon/EditIcon";
import { RemoveIcon } from "../../../../components/Icon/RemoveIcon";
import { Modal } from "../../../../components/Modal";
import { Stack } from "../../../../components/Stack";
import { StatusButton } from "../../../../components/StatusButton";
import { Text } from "../../../../components/Text";
import { StrataMembership, User } from "../../../../data";
import { p } from "../../../../data/users/permissions";
import { useCan } from "../../../../hooks/useCan";
import { classnames } from "../../../../utils/classnames";

interface Props {
  approveStrataMembership: (membershipId: string) => void;
  deleteStrataMembership: (userId: string) => any;
  className?: string;
  membership: StrataMembership & User;
  upsertStrataMembership: (userId: string, fd: FormData) => any;
}

export function MembershipTile({
  approveStrataMembership,
  className,
  deleteStrataMembership,
  membership,
  upsertStrataMembership,
}: Props) {
  const [showEditModal, setShowEditModal] = useState(false);
  const can = useCan();

  return (
    <>
      <Stack className={classnames(className, styles.membershipTile)}>
        <Group
          className={s({ mb: "normal" })}
          align="start"
          justify="space-between"
        >
          <Stack gap="xxs">
            <Header as="h3">{membership.name}</Header>
            {membership.unit && (
              <Text color="secondary">Unit {membership.unit}</Text>
            )}
          </Stack>

          <Group gap="small">
            {can(p("stratas", "memberships", "edit")) && (
              <Button
                icon={<EditIcon />}
                onClick={() => setShowEditModal(true)}
                size="small"
                color="primary"
                style="tertiary"
              />
            )}
            {can(p("stratas", "memberships", "delete")) &&
              membership.role !== "administrator" && (
                <StatusButton
                  action={deleteStrataMembership.bind(
                    undefined,
                    membership.userId,
                  )}
                  icon={<RemoveIcon />}
                  style="tertiary"
                  color="error"
                  size="small"
                />
              )}
          </Group>
        </Group>

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
      </Stack>
      {showEditModal && (
        <Modal
          closeModal={() => setShowEditModal(false)}
          title={`Update ${membership.name}`}
        >
          <CreateOrUpdateStrataMembershipForm
            strataMembership={membership}
            upsertStrataMembership={upsertStrataMembership.bind(
              undefined,
              membership.userId,
            )}
          />
        </Modal>
      )}
    </>
  );
}
