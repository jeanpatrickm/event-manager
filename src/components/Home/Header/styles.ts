import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: var(--background-dark-e);
  height: 60px;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #2a293b;
  border-radius: 20px;
  padding: 8px 15px;
  width: 300px;
`;

export const SearchInput = styled.input`
  background: transparent;
  border: none;
  color: white;
  margin-left: 10px;
  width: 100%;
  outline: none;

  &::placeholder {
    color: #666;
  }
`;

export const IconsContainer = styled.div`
  display: flex;
  gap: 15px;
`;

export const IconButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;
