import { Link } from "react-router-dom";
import styled from "styled-components";

export const SidebarContainer = styled.aside`
  width: 240px;
  height: 100vh;
  background-color: #1a1a2a;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #2a2a3a;
`;

export const Logo = styled.div`
  padding: 0 20px;
  margin-bottom: 30px;
`;

export const LogoText = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: #8a5cf6;
`;

export const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const NavItem = styled.li`
  margin-bottom: 4px;
`;

export const NavLink = styled(Link)<{ $active: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: ${(props) => (props.$active ? "#ffffff" : "#a0a0b0")};
  background-color: ${(props) => (props.$active ? "#2a2a3a" : "transparent")};
  border-left: ${(props) =>
    props.$active ? "4px solid #8a5cf6" : "4px solid transparent"};
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    background-color: #2a2a3a;
    color: #ffffff;
  }
`;

export const NavText = styled.span`
  margin-left: 12px;
  font-size: 14px;
  font-weight: 500;
`;
