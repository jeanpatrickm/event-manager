import styled from "styled-components";

export const QueueContainer = styled.section`
  background-color: var(--background-dark-2);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  border: 1px solid var(--color-warning);
`;

export const QueueHeader = styled.div`
  margin-bottom: 16px;
`;

// NOVO: Container para alinhar título e botões de navegação
export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-size: 18px;
    font-weight: 600;
    color: var(--color-warning);
    margin: 0;
  }
`;

// NOVO: Container para os botões de navegação
export const NavButtons = styled.div`
  display: flex;
  gap: 8px;
`;

export const RequestList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const RequestItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  background-color: var(--background-dark-3);
  border-radius: 8px;
`;

export const RequestAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
`;

export const RequestInfo = styled.div`
  flex-grow: 1;
`;

export const RequestName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: var(--white);
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

// ALTERADO: Adicionado um novo 'variant' para os botões de navegação
export const ActionButton = styled.button<{
  variant: "approve" | "deny" | "nav";
}>`
  display: flex;
  align-items: center;
  gap: 6px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--white);

  ${({ variant }) => {
    switch (variant) {
      case "nav":
        return `
          background-color: var(--background-dark-3);
          padding: 6px;
          &:hover:not(:disabled) {
            background-color: var(--color-dark-grey-text);
          }
        `;
      case "approve":
        return `
          background-color: var(--color-success);
          padding: 8px 12px;
           &:hover:not(:disabled) {
            opacity: 0.85;
          }
        `;
      case "deny":
        return `
          background-color: var(--color-danger);
          padding: 8px 12px;
           &:hover:not(:disabled) {
            opacity: 0.85;
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;