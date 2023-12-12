"use client";

import * as styles from "./style.css";

import { classnames } from "../../utils/classnames";

interface Props {
  activeTab: string;
  className?: string;
  setActiveTab: (nextTab: string) => void;
  tabs: string[];
}

export function Tabs({ activeTab, className, setActiveTab, tabs }: Props) {
  return (
    <div className={classnames(styles.tabs, className)}>
      {tabs.map((t) => (
        <div
          key={t}
          className={activeTab === t ? styles.activeTabsTab : styles.tabsTab}
          onClick={() => setActiveTab(t)}
        >
          {t}
        </div>
      ))}
    </div>
  );
}
