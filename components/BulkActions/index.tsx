"use client";

import * as styles from "./style.css";

import { useContext } from "react";

import { pluralize } from "../../utils/pluralize";
import { Group } from "../Group";
import { InfoPanel } from "../InfoPanel";
import {
  TableSelectCtx,
  TableSelectedValuesCtx,
} from "../Table/TableSelectProvider";
import { Text } from "../Text";

interface Props {
  children: React.ReactNode;
  noun: string;
}

export function BulkActions({ children, noun }: Props) {
  const selectCtx = useContext(TableSelectCtx);
  const selectedRows = useContext(TableSelectedValuesCtx);

  if (!selectCtx || selectedRows.length === 0) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <InfoPanel className={styles.container} pv="xs" ph="small">
        <Group gap="small">
          <Text fontWeight="bold">
            {selectedRows.length} {pluralize(noun, selectedRows.length)}{" "}
            selected
          </Text>
          {children}
        </Group>
      </InfoPanel>
    </div>
  );
}
