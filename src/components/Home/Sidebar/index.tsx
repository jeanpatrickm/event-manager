import type React from "react";
import {
  SidebarContainer,
  SidebarTitle,
  SidebarItem,
  SidebarIcon,
  SidebarText,
  WaveVisualizer,
} from "./styles";
import {
  Home,
  Music,
  GamepadIcon as GameController,
  GraduationCap,
  Atom,
  Film,
  Users,
} from "lucide-react";

interface SidebarProps {
  activeItem?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem = "Home" }) => {
  const menuItems = [
    { id: "home", label: "Home", icon: <Home size={20} /> },
    { id: "music", label: "Music", icon: <Music size={20} /> },
    { id: "gaming", label: "Gaming", icon: <GameController size={20} /> },
    { id: "education", label: "Education", icon: <GraduationCap size={20} /> },
    { id: "science", label: "Science & Tech", icon: <Atom size={20} /> },
    { id: "entertainment", label: "Entertainment", icon: <Film size={20} /> },
    { id: "hubs", label: "Event Hubs", icon: <Users size={20} /> },
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
