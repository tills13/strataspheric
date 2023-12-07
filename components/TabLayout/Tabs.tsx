"use client";

import * as styles from "./style.css";

interface Props {
  activeTab: string;
  setActiveTab: (nextTab: string) => void;
  tabs: string[];
}

export function Tabs({ activeTab, setActiveTab, tabs }: Props) {
  return (
    <div className={styles.tabs}>
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
