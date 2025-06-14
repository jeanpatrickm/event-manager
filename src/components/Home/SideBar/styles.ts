import { Link } from "react-router-dom";
import styled from "styled-components";

export const SidebarContainer = styled.aside`
  width: 240px;
  height: 100vh;
  background-color: var(--background-dark);
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--background-dark-2);
`;

export const Logo = styled.div`
  padding: 0 20px;
  align-self: center;
`;

export const LogoText = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: var(--logo-text);
  margin-left: 1rem;
`;

export const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: 2rem;
`;

export const NavItem = styled.li`
  margin-bottom: 4px;
  margin-left: 1rem;
`;

export const NavLink = styled(Link)<{ $active: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: ${(props) => (props.$active ? "var(--white)" : "var(--user-tag-span)")};
  background-color: ${(props) => (props.$active ? "var(--background-dark-2)" : "transparent")};
  border-left: ${(props) =>
    props.$active ? "4px solid  var(--logo-text)" : "4px solid transparent"};
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    background-color: var(--background-dark-2);
    color: var(--white);
  }
`;

export const NavText = styled.span`
  margin-left: 1rem;
  font-size: 14px;
  font-weight: 500;
`;

export const UserContainer = styled.div`
  margin-left: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const UserAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  background-color: var(--background-dark-3);
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: var(--white);
`;

export const UserTag = styled.span`
  font-size: 12px;
  color: var(--user-tag-span);
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: nowrap;
`
export const NavButton = styled.button`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  width: 100%;
  color: var(--user-tag-span);
  background-color: transparent;
  border: none;
  border-left: 4px solid transparent;
  text-decoration: none;
  transition: all 0.2s;
  cursor: pointer;
  font-family: inherit;
  font-size: 1em;
  text-align: left;

  &:hover {
    background-color: var(--background-dark-2);
    color: var(--white);
  }
`;