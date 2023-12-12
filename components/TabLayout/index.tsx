"use client";

import * as styles from "./style.css";

import React, { useState } from "react";

import { Tabs } from "./Tabs";

export const TabContext = React.createContext<string>(null!);

interface Props {
  defaultTab: string;
  tabs: string[];
  tabsClassName?: string;
}

export function TabLayout({
  defaultTab,
  children,
  tabs,
  tabsClassName,
}: React.PropsWithChildren<Props>) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]);

  return (
    <div className={styles.tabLayout}>
      <div className={styles.tabsContainer}>
        <Tabs
          activeTab={activeTab}
          className={tabsClassName}
          setActiveTab={setActiveTab}
          tabs={tabs}
        />
      </div>

      <TabContext.Provider value={activeTab}>
        <div className={styles.tabContainer}>{children}</div>
      </TabContext.Provider>
    </div>
  );
}
