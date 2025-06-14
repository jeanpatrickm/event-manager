import styled from "styled-components";
import { Search } from "lucide-react";

export const TopBarContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: end;
  padding: 12px 24px;
  background-color: var(--background-dark-e);
  border-bottom: 1px solid var(--background-dark-2);
`;

export const SearchContainer = styled.div`
  position: relative;
  width: 300px;
`;

export const SearchIcon = styled(Search)`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-grey-text);
  width: 18px;
  height: 18px;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 8px 12px 8px 36px;
  background-color: var(--background-dark-2);
  border: 1px solid var(--background-dark-3);
  border-radius: 20px;
  color: var(--white);
  font-size: 14px;

  &:focus {
    outline: none;
    border-color:  var(--logo-text);
  }

  &::placeholder {
    color: var(--color-grey-text);
  }
`;

export const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  color: var(--user-tag-span);
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: var(--white);
  }
`;

export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: 8px;
`;

export const UserAvatar = styled.img`
  width: 36px;
  height: 36px;
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

export const NotificationBadge = styled.span`
  position: absolute;
  top: 4px;
  right: 4px;
  background-color: var(--color-danger);
  color: white;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  font-size: 10px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--background-dark-e);
`;