"use client";

import * as styles from "./style.css";

import { Session } from "next-auth";
import { Strata } from "../../data/stratas/getStrata";
import { MenuIcon } from "../Icon/MenuIcon";
import { IconButton } from "../IconButton";
import { useState } from "react";
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
          <MenuIcon />
        </IconButton>
      </div>
      {showMenu && (
        <Modal>
          <div>
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
