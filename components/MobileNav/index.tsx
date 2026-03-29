"use client";

import * as styles from "./style.css";

import React, { useState } from "react";

import { Button } from "../Button";
import { Header } from "../Header";
import { MoreIcon } from "../Icon/MoreIcon";
import { Modal } from "../Modal";

interface Props {
  children: React.ReactNode;
  title: string;
}

export function MobileNav({ children, title }: Props) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className={styles.mobileNav}>
      <span className={styles.mobileNavTitle}>{title}</span>
      <Button
        icon={<MoreIcon />}
        onClick={() => setShowMenu(!showMenu)}
        style="tertiary"
      />
      {showMenu && (
        <Modal
          closeModal={() => setShowMenu(false)}
          title={<Header as="h1">{title}</Header>}
        >
          {children}
        </Modal>
      )}
    </div>
  );
}
