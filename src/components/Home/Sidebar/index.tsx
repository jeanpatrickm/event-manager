import type React from "react";
import {
  SidebarContainer,
  SidebarTitle,
  SidebarItem,
  SidebarIcon,
  SidebarText,
  WaveVisualizer,
} from "./styles";
import { Home, Users, CirclePlus } from "lucide-react";

interface SidebarProps {
  activeItem?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem = "Home" }) => {
  const menuItems = [
    { id: "home", label: "Home", icon: <Home size={20} /> },
    {
      id: "criarevent",
      label: "Create Event",
      icon: <CirclePlus size={20} />,
    },
    { id: "hubs", label: "Public Events", icon: <Users size={20} /> },
  ];

  return (
    <SidebarContainer>
      <SidebarTitle>Explore</SidebarTitle>

      {menuItems.map((item) => (
        <SidebarItem key={item.id} $active={activeItem === item.label}>
          <SidebarIcon>{item.icon}</SidebarIcon>
          <SidebarText>{item.label}</SidebarText>
        </SidebarItem>
      ))}

      <WaveVisualizer />
    </SidebarContainer>
  );
};

export default Sidebar;
