"use client";

import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import React, { useState } from "react";

import { Strata } from "../../data";
import { classnames } from "../../utils/classnames";
import { Button } from "../Button";
import { Header } from "../Header";
import { MoreIcon } from "../Icon/MoreIcon";
import { Modal } from "../Modal";

interface Props {
  actions: React.ReactNode;
  strata: Strata;
}

export function GlobalHeaderMobileActions({ actions, strata }: Props) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <div className={classnames(styles.globalMobileHeaderActions)}>
        <Button
          icon={<MoreIcon />}
          onClick={() => setShowMenu(!showMenu)}
          style="tertiary"
        />
      </div>
      {showMenu && (
        <Modal
          closeModal={() => setShowMenu(false)}
          title={
            <Header as="h1">
              <span className={styles.titleLink}>{strata.name}</span>
            </Header>
          }
        >
          {actions}
        </Modal>
      )}
    </>
  );
}
