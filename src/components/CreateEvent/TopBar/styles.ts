import styled from "styled-components";
import { Search } from "lucide-react";

export const TopBarContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  background-color: #1e1e2e;
  border-bottom: 1px solid #2a2a3a;
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
  color: #6c6c7c;
  width: 18px;
  height: 18px;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 8px 12px 8px 36px;
  background-color: #2a2a3a;
  border: 1px solid #3a3a4a;
  border-radius: 20px;
  color: #ffffff;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #8a5cf6;
  }

  &::placeholder {
    color: #6c6c7c;
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
  color: #a0a0b0;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #ffffff;
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
  background-color: #3a3a4a;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
`;

export const UserTag = styled.span`
  font-size: 12px;
  color: #a0a0b0;
`;
