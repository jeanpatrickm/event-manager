import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: var(--background-dark-2);
  padding: 24px;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const ModalTitle = styled.h2`
  font-size: 20px;
  margin: 0;
  color: var(--white);
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: var(--user-tag-span);
  cursor: pointer;
  &:hover {
    color: var(--white);
  }
`;

export const SearchInputContainer = styled.div`
  position: relative;
  margin-bottom: 16px;
  svg {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 12px;
    color: var(--color-grey-text);
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px 12px 10px 40px;
  background-color: var(--background-dark-3);
  border: 1px solid var(--color-dark-grey-text);
  border-radius: 6px;
  color: var(--white);
  font-size: 14px;
  &:focus {
    outline: none;
    border-color: var(--logo-text);
  }
`;

export const UserList = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  margin-right: -10px;
  padding-right: 10px;
`;

export const UserItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: var(--background-dark-3);
  }
`;

export const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
`;

export const UserInfo = styled.div`
  flex-grow: 1;
  span {
    font-size: 12px;
    color: var(--user-tag-span);
  }
`;

export const UserName = styled.p`
  margin: 0;
  font-weight: 500;
  color: var(--white);
`;

export const UserCheckbox = styled.input`
  width: 18px;
  height: 18px;
  accent-color: var(--logo-text);
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid var(--background-dark-3);
`;

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--user-tag-span);
`;

export const ActionButton = styled.button`
  background-color: var(--logo-text);
  color: var(--white);
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const CancelButton = styled(ActionButton)`
  background-color: var(--color-dark-grey-text);
`;