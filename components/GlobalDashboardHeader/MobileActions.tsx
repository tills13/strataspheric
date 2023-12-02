"use client";

import * as styles from "./style.css";

import { Session } from "next-auth";
import { useState } from "react";

import { Strata } from "../../data";
import { MenuIcon } from "../Icon/MenuIcon";
import { IconButton } from "../IconButton";
import { Logo } from "../Logo";
import { Modal } from "../Modal";
import { GlobalHeaderActions } from "./Actions";

interface Props {
  session: Session | null;
  strata: Strata;
}

export function GlobalHeaderMobileActions({ session, strata }: Props) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <div className={styles.globalMobileHeaderActions}>
        <IconButton onClick={() => setShowMenu(!showMenu)}>
          <MenuIcon className={styles.hamburgerIcon} />
        </IconButton>
      </div>
      {showMenu && (
        <Modal closeModal={() => setShowMenu(false)}>
          <div>
            <Logo />

            <GlobalHeaderActions
              className={styles.globalMobileHeaderModalActions}
              session={session}
              strata={strata}
            />
          </div>
        </Modal>
      )}
    </>
  );
}
