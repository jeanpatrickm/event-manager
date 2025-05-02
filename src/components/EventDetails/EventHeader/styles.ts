import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  color: var(--user-tag-span);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;

  &:hover {
    color: var(--white);
  }

  svg {
    margin-right: 6px;
  }
`;

export const EventStatusBadge = styled.div<{ color: string }>`
  padding: 6px 12px;
  background-color: ${(props) => props.color}20;
  color: ${(props) => props.color};
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
`;
