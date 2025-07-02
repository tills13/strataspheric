"use client";

import * as styles from "./style.css";

import { useEffect, useState } from "react";

import { Strata } from "../../data";
import { Group } from "../Group";
import { ArrowForwardIcon } from "../Icon/ArrowForwardIcon";
import { Logo } from "../Logo";
import { Modal } from "../Modal";
import { ServerUserStrataSelectorButton } from "./ServerUserStrataSelectorButton";
import { UserStrataSelector } from "./UserStrataSelector";

type ServerUserStrataSelectorProps = React.ComponentProps<
  typeof ServerUserStrataSelectorButton
>;

interface Props extends ServerUserStrataSelectorProps {
  sessionStratas: Strata[];
}

export function UserStrataSelectorButton({
  currentStrata,
  sessionStratas,
}: Props) {
  const [showStrataSelectorModal, setShowStrataSelectorModal] = useState(false);
  const [showHasStratas, setShowHasStratas] = useState(false);

  useEffect(() => {
    setShowHasStratas(sessionStratas.length > 1);
  }, [sessionStratas]);

  return (
    <>
      <Group
        ph="normal"
        gap="large"
        className={styles.selectedStrataContainer}
        justify="space-between"
      >
        <Group gap="small">
          <Logo h="small" />
          <h1 className={styles.userStrataSelectorText}>
            {currentStrata.name}
          </h1>
        </Group>
        <ArrowForwardIcon
          className={
            styles.userStrataSelectorIcon[showHasStratas ? "true" : "false"]
          }
          size="xs"
        />
      </Group>

      {showStrataSelectorModal && (
        <Modal
          closeModal={() => setShowStrataSelectorModal(false)}
          title="User Stratas"
        >
          <UserStrataSelector stratas={sessionStratas} />
        </Modal>
      )}
    </>
  );
}
