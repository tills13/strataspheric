"use client";

import * as styles from "./style.css";

import { useContext } from "react";

import { TabContext } from ".";

export function Tab({ children, name }) {
  const activeTab = useContext(TabContext);

  return (
    <div className={activeTab === name ? styles.activeTab : styles.tab}>
      {children}
    </div>
  );
}
