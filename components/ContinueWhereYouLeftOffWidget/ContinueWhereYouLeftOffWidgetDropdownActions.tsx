"use client";

import * as styles from "./style.css";

import { signOut } from "../../auth/actions";
import { protocol, tld } from "../../constants";
import { DropdownActions } from "../DropdownActions";
import { PersonIcon } from "../Icon/PersonIcon";
import { SignOutIcon } from "../Icon/SignOutIcon";

export function ContinueWhereYouLeftOffWidgetDropdownActions() {
  return (
    <DropdownActions
      actions={[
        {
          async action() {
            await signOut();
            location.href = protocol + "//" + tld;
          },
          label: "Sign Out",
          icon: <SignOutIcon />,
        },
        {
          action: "/profile",
          label: "Profile",
          icon: <PersonIcon />,
        },
      ]}
      className={styles.continueActionOverflow}
      direction="up"
      buttonStyle="tertiary"
    />
  );
}
