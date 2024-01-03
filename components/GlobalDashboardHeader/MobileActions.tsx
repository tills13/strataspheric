"use client";

import * as styles from "./style.css";

import { Session } from "next-auth";
import { useState } from "react";

import { Strata } from "../../data";
import { Button } from "../Button";
import { MenuIcon } from "../Icon/MenuIcon";
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
        <Button
          icon={<MenuIcon className={styles.hamburgerIcon} />}
          onClick={() => setShowMenu(!showMenu)}
        />
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
