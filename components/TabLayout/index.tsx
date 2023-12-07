"use client";

import * as styles from "./style.css";

import React, { useState } from "react";

import { Tabs } from "./Tabs";

export const TabContext = React.createContext<string>(null!);

interface Props {
  tabs: string[];
  defaultTab: string;
}

export function TabLayout({ defaultTab, children, tabs }) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]);

  return (
    <div className={styles.tabLayout}>
      <div className={styles.tabsContainer}>
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
      </div>

      <TabContext.Provider value={activeTab}>
        <div className={styles.tabContainer}>{children}</div>
      </TabContext.Provider>
    </div>
  );
}
