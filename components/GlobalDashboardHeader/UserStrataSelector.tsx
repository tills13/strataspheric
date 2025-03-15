"use client";

import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import { useEffect, useState } from "react";

import { mustAuth } from "../../auth";
import { protocol } from "../../constants";
import { Strata } from "../../data";
import { getUserStratas } from "../../data/users/getUserStratas";
import { classnames } from "../../utils/classnames";
import { Group } from "../Group";
import { Header } from "../Header";
import { ArrowForwardIcon } from "../Icon/ArrowForwardIcon";
import { ExternalLink } from "../Link/ExternalLink";
import { Modal } from "../Modal";
import { Panel } from "../Panel";
import { Stack } from "../Stack";
import { Text } from "../Text";
import { ServerUserStrataSelector } from "./ServerUserStrataSelector";

type ServerUserStrataSelectorProps = React.ComponentProps<
  typeof ServerUserStrataSelector
>;

interface Props extends ServerUserStrataSelectorProps {
  sessionStratas: Strata[];
}

export function UserStrataSelector({ currentStrata, sessionStratas }: Props) {
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
            size="small"
          />
        </Group>
      </div>
      {showStrataSelectorModal && (
        <Modal
          closeModal={() => setShowStrataSelectorModal(false)}
          title="User Stratas"
        >
          <Stack>
            {sessionStratas.map((strata) => (
              <ExternalLink
                key={strata.id}
                href={`${protocol}//${strata.domain}`}
                noUnderline
              >
                <div className={styles.userStrataSelectorStrata}>
                  <Group justify="space-between">
                    <Group>
                      <Text size="large" weight="bold">
                        {strata.name}
                      </Text>

                      <Text color="secondary" size="small">
                        {strata.domain}
                      </Text>
                    </Group>
                    <ArrowForwardIcon size="small" />
                  </Group>
                </div>
              </ExternalLink>
            ))}
          </Stack>
        </Modal>
      )}
    </>
  );
}
