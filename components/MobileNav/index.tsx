"use client";

import * as styles from "./style.css";

import React, { useState } from "react";

import { classnames } from "../../utils/classnames";
import { Button } from "../Button";
import { Header } from "../Header";
import { MoreIcon } from "../Icon/MoreIcon";
import { Modal } from "../Modal";

interface Props {
  children: React.ReactNode;
  className?: string;
  title: string;
  showTitle?: boolean;
}

export function MobileNav({
  children,
  className,
  title,
  showTitle = true,
}: Props) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className={classnames(styles.mobileNav, className)}>
      {showTitle && <span className={styles.mobileNavTitle}>{title}</span>}
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
