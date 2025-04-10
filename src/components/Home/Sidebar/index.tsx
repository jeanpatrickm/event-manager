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
import { Link } from "react-router-dom"; // Importe o Link

interface SidebarProps {
  activeItem?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem = "Home" }) => {
  const menuItems = [
    { id: "home", label: "Home", icon: <Home size={20} />, path: "/" },
    {
      id: "criarevent",
      label: "Create Event",
      icon: <CirclePlus size={20} />,
      path: "/create-event",
    },
    {
      id: "hubs",
      label: "Public Events",
      icon: <Users size={20} />,
      path: "/",
    },
  ];

  return (
    <SidebarContainer>
      <SidebarTitle>EventManager</SidebarTitle>

      {menuItems.map((item) => (
        <Link to={item.path} key={item.id} style={{ textDecoration: "none" }}>
          <SidebarItem $active={activeItem === item.label}>
            <SidebarIcon>{item.icon}</SidebarIcon>
            <SidebarText>{item.label}</SidebarText>
          </SidebarItem>
        </Link>
      ))}

      <WaveVisualizer />
    </SidebarContainer>
  );
};

export default Sidebar;
