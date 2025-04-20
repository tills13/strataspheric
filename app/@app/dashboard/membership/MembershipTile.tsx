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
import { InternalLink } from "../../../../components/Link/InternalLink";
import { Modal } from "../../../../components/Modal";
import { Panel } from "../../../../components/Panel";
import { Stack } from "../../../../components/Stack";
import { StatusButton } from "../../../../components/StatusButton";
import { Text } from "../../../../components/Text";
import { StrataMembership } from "../../../../data/memberships/getStrataMembership";
import { useCan } from "../../../../hooks/useCan";
import { deleteStrataMembershipAction } from "./actions";

interface Props {
  className?: string;
  membership: StrataMembership;
}

export function MembershipTile({
  className,

  membership,
}: Props) {
  const [showEditModal, setShowEditModal] = useState(false);
  const can = useCan();

  return (
    <>
      <Panel className={className}>
        <Stack>
          <Group align="start" justify="space-between">
            <Stack gap="xxs">
              <Header as="h3">{membership.name}</Header>
              {membership.unit && (
                <Text color="secondary">Unit {membership.unit}</Text>
              )}
            </Stack>

            <Group gap="small">
              {can("stratas.memberships.edit") && (
                <InternalLink href={`/dashboard/membership/${membership.id}`}>
                  <Button
                    icon={<EditIcon />}
                    size="small"
                    color="primary"
                    style="tertiary"
                  />
                </InternalLink>
              )}
              {can("stratas.memberships.delete") &&
                membership.role !== "administrator" && (
                  <StatusButton
                    action={deleteStrataMembershipAction.bind(
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
              {can("stratas.memberships.view")
                ? membership.email
                : "*****@*****.***"}
            </dd>
            {membership.phoneNumber && (
              <>
                <dt className={styles.membershipTileDt}>Phone</dt>
                <dd className={styles.membershipTileDd}>
                  {can("stratas.memberships.view")
                    ? membership.phoneNumber
                    : "***-***-****"}
                </dd>
              </>
            )}
            <dt className={styles.membershipTileDt}>Role</dt>
            <dd className={styles.membershipTileDd}>{membership.role}</dd>
          </dl>

          {membership.role === "pending" && can("stratas.memberships.edit") && (
            <ApproveStrataMembershipButton
              membership={membership}
              className={s({ mt: "normal" })}
            />
          )}
        </Stack>
      </Panel>
      {showEditModal && (
        <Modal
          closeModal={() => setShowEditModal(false)}
          title={`Update ${membership.name}`}
        >
          <CreateOrUpdateStrataMembershipForm membership={membership} />
        </Modal>
      )}
    </>
  );
}
