"use client";

import * as styles from "./style.css";

import { useContext } from "react";

import { TabContext } from ".";

interface Props {
  children: React.ReactNode;
  name: string;
}

export function Tab({ children, name }: Props) {
  const activeTab = useContext(TabContext);

  return (
    <div className={activeTab === name ? styles.activeTab : styles.tab}>
      {children}
    </div>
  );
}
