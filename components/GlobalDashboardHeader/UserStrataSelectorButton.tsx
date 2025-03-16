"use client";

import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import { useEffect, useState } from "react";

import { Strata } from "../../data";
import { classnames } from "../../utils/classnames";
import { Group } from "../Group";
import { ArrowForwardIcon } from "../Icon/ArrowForwardIcon";
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
    setShowHasStratas(sessionStratas.length !== 0);
  }, [sessionStratas]);

  return (
    <>
      <div
        className={classnames(
          s({ p: "normal" }),
          styles.userStrataSelectorContainer,
        )}
        onClick={() => setShowStrataSelectorModal(true)}
      >
        <Group gap="large" className={styles.selectedStrataContainer}>
          <h1 className={styles.userStrataSelectorText}>
            {currentStrata.name}
          </h1>
          <ArrowForwardIcon
            className={
              styles.userStrataSelectorIcon[showHasStratas ? "true" : "false"]
            }
            size="xs"
          />
        </Group>
      </div>
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
