import type React from "react";
import { Home, Calendar, Users } from "lucide-react";
import {
  SidebarContainer,
  Logo,
  LogoText,
  NavList,
  NavItem,
  NavLink,
  NavText,
} from "./styles";

const Sidebar: React.FC = () => {
  return (
    <SidebarContainer>
      <Logo>
        <LogoText>EventManager</LogoText>
      </Logo>

      <NavList>
        <NavItem>
          <NavLink href="/Home" $active={false}>
            <Home size={20} />
            <NavText>Home</NavText>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink href="/create-event" $active={true}>
            <Calendar size={20} />
            <NavText>Create Event</NavText>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink href="/public-events" $active={false}>
            <Users size={20} />
            <NavText>Public Events</NavText>
          </NavLink>
        </NavItem>
      </NavList>
    </SidebarContainer>
  );
};

export default Sidebar;
