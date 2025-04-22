"use client";

import type React from "react";
import { useState } from "react";
import { TabContainer, TabItem, TabContent } from "./styles";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabNavigationProps {
  tabs: Tab[];
  defaultTab?: string;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ tabs, defaultTab }) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].id);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <>
      <TabContainer>
        {tabs.map((tab) => (
          <TabItem
            key={tab.id}
            $active={activeTab === tab.id}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </TabItem>
        ))}
      </TabContainer>
      <TabContent>
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </TabContent>
    </>
  );
};

export default TabNavigation;
