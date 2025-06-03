import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: var(--background-dark-e);
  height: 60px;
  position: relative;
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
  align-items: center;
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
  padding: 0;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &:focus {
    outline: 2px solid rgba(255, 255, 255, 0.3);
    outline-offset: 2px;
  }
`;

// ---  ESTILOS PARA O DROPDOWN ---

export const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 5px);
  right: 0;
  background-color: #2a293b;
  border: 1px solid #3a394b;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 100;
  width: max-content;
  min-width: 160px;
  padding: 5px 0;
`;

export const DropdownMenuItem = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  color: white;
  padding: 10px 15px;
  width: 100%;
  text-align: left;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.08);
  }

  svg {
    margin-right: 10px;
    color: #ccc; // Cor do ícone
  }
`;
