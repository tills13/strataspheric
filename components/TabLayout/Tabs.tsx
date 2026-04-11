"use client";

import * as styles from "./style.css";

import type { TabDefinition } from ".";
import { classnames } from "../../utils/classnames";

interface Props {
  activeTab: string;
  className?: string;
  setActiveTab: (nextTab: string) => void;
  tabs: TabDefinition[];
}

export function Tabs({ activeTab, className, setActiveTab, tabs }: Props) {
  return (
    <div className={classnames(styles.tabs, className)}>
      {tabs.map((t) => {
        const isActive = activeTab === t.name;
        return (
          <div
            key={t.name}
            className={isActive ? styles.activeTabsTab : styles.tabsTab}
            onClick={() => setActiveTab(t.name)}
          >
            <span
              className={
                isActive ? styles.activeTabsTabLabel : styles.tabsTabLabel
              }
            >
              {t.label}
            </span>
            {t.description && (
              <span
                className={
                  isActive
                    ? styles.activeTabsTabDescription
                    : styles.tabsTabDescription
                }
              >
                {t.description}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
