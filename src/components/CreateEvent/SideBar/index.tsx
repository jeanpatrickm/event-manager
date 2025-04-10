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
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <SidebarContainer>
      <Logo>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <LogoText>EventManager</LogoText>
        </Link>
      </Logo>

      <NavList>
        <NavItem>
          <NavLink as={Link} to="/" $active={false}>
            <Home size={20} />
            <NavText>Home</NavText>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink as={Link} to="/create-event" $active={false}>
            <Calendar size={20} />
            <NavText>Create Event</NavText>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink as={Link} to="/" $active={false}>
            <Users size={20} />
            <NavText>Public Events</NavText>
          </NavLink>
        </NavItem>
      </NavList>
    </SidebarContainer>
  );
};

export default Sidebar;
