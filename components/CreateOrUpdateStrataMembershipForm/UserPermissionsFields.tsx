"use client";

import * as styles from "./style.css";

import { useState } from "react";

import { StrataMembership } from "../../data/memberships/getStrataMembership";
import {
  allPermissions,
  can,
  roleScopeToScopes,
} from "../../data/users/permissions";
import { Checkbox } from "../Checkbox";
import { Flex } from "../Flex";
import { Group } from "../Group";
import { Header } from "../Header";
import { WarningIcon } from "../Icon/WarningIcon";
import { InfoPanel } from "../InfoPanel";
import { Input } from "../Input";
import { Stack } from "../Stack";
import { Text } from "../Text";

interface Props {
  membership: StrataMembership;
}

export function UserPermissionsFields({ membership }: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPermissions = allPermissions.filter((permission) =>
    permission.includes(searchTerm),
  );

  const rolePermissions = roleScopeToScopes(membership.role);
  const roleMissingPermissions = rolePermissions.filter(
    (permission) => !can(membership, permission),
  );

  return (
    <>
      <Flex align="center" justify="space-between" from="tablet">
        <Header as="h3">Permissions</Header>
        <Input
          onChangeValue={setSearchTerm}
          placeholder="Search Permissions"
          value={searchTerm}
        />
      </Flex>

      {membership.role === "administrator" && (
        <InfoPanel level="warning" mb="normal">
          Cannot change permissions of administrator users.
        </InfoPanel>
      )}

      {roleMissingPermissions.length !== 0 && (
        <InfoPanel level="warning" mb="normal">
          <Text>
            This user's custom permissions are stricter than their role's
            default permissions. Compared to a normal <b>{membership.role}</b>,
            this user cannot: <b>{roleMissingPermissions.join(",")}</b>. If this
            is not intentional, you can reset their permissions using the button
            below.
          </Text>
        </InfoPanel>
      )}

      <Stack gap="0" className={styles.permissionTable}>
        {allPermissions.map((permission) => (
          <Group
            className={styles.permissionTableRow}
            style={
              !filteredPermissions.includes(permission)
                ? { display: "none" }
                : undefined
            }
            justify="space-between"
            key={permission}
          >
            <div>
              <pre>{permission}</pre>
            </div>
            <div>
              <Group gap="normal">
                {roleMissingPermissions.includes(permission) && (
                  <WarningIcon size="xs" fillColor="orange500" />
                )}
                <Checkbox
                  defaultChecked={can(membership, permission)}
                  disabled={membership.role === "administrator"}
                  name={`permission[${permission}]`}
                />
              </Group>
            </div>
          </Group>
        ))}
      </Stack>
    </>
  );
}
