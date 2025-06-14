import styled from "styled-components";
import { Link } from "react-router-dom";

export const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 380px;
  max-height: 450px;
  overflow-y: auto;
  background-color: var(--background-dark-2);
  border-radius: 8px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  border: 1px solid var(--background-dark-3);
`;

export const NotificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid var(--background-dark-3);
  h3 {
    margin: 0;
    font-size: 16px;
  }
`;

export const MarkAllAsRead = styled.button`
  background: none;
  border: none;
  color: var(--logo-text);
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
  }
`;

export const NotificationLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block; /* Garante que o link ocupe todo o espaço do item */
`;

export const NotificationItem = styled.div<{ $lida: boolean }>`
  padding: 12px 16px;
  border-bottom: 1px solid var(--background-dark-3);
  transition: background-color 0.2s;
  background-color: ${(props) =>
    props.$lida ? "transparent" : "rgba(138, 92, 246, 0.1)"};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: var(--background-dark-3);
  }

  strong {
    display: block;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 4px;
    color: ${(props) => (props.$lida ? "var(--user-tag-ligth)" : "#fff")};
  }

  p {
    font-size: 14px;
    line-height: 1.4;
    color: var(--user-tag-span);
    margin: 0 0 6px 0;
  }

  small {
    font-size: 12px;
    color: var(--color-grey-text);
  }
`;

export const EmptyState = styled.div`
  padding: 24px;
  text-align: center;
  color: var(--user-tag-span);
`;

// --- NOVOS ESTILOS ---
export const NotificationActions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 10px;
`;

export const ActionButton = styled.button`
  background: none;
  border: 1px solid var(--color-dark-grey-text);
  color: var(--user-tag-ligth);
  padding: 4px 10px;
  font-size: 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: var(--white);
    color: var(--white);
  }

  &.delete:hover {
    border-color: var(--color-danger);
    background-color: rgba(244, 67, 54, 0.1);
    color: var(--color-danger);
  }
`;
