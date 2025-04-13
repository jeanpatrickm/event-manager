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
  Row
} from "./styles";
import {
  UserContainer,
  UserAvatar,
  // UserInfo,
  // UserName,
  // UserTag
} from "./styles";//from "../TopBar/styles"
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {

  // Dados do usuário (você pode receber via props ou contexto)
  const currentUser = {
    username: "jay",
    name: "Jay",
    avatar: "/images/aaa.jpg?height=40&width=40",
  };

  return (
    <SidebarContainer>
      {/* Container do usuário com Link */}
      {/* <SidebarColorized></SidebarColorized> */}
      <Row>
        <Link
          to={`/profile/`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <UserContainer>
            <UserAvatar src={currentUser.avatar} alt={currentUser.name} />
            {/* <UserInfo>
              <UserName>{currentUser.name}</UserName>
              <UserTag>@{currentUser.username}</UserTag>
            </UserInfo> */}
          </UserContainer>
        </Link>

        <Logo>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <LogoText>Explorar</LogoText>
          </Link>
        </Logo>
      </Row>

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
