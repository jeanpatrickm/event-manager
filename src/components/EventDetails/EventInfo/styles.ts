import styled from "styled-components";

export const InfoSection = styled.section`
  background-color: var(--background-dark-2);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 24px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InfoLabel = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: var(--user-tag-span);
  margin-bottom: 6px;

  svg {
    margin-right: 8px;
  }
`;

// 1. Adicionada a prop opcional '$isFull'
export const InfoValue = styled.div<{ $isFull?: boolean }>`
  font-size: 16px;
  font-weight: 500;
  /* 2. Aplica a cor vermelha se '$isFull' for verdadeiro, senão, usa a cor padrão */
  color: ${(props) => (props.$isFull ? "var(--color-danger)" : "var(--white)")};
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
`;

export const TagItem = styled.div`
  padding: 6px 12px;
  background-color: var(--background-dark-3);
  border-radius: 20px;
  font-size: 12px;
  color: var(--user-tag-ligth);
`;

export const ActionButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export const JoinEventButton = styled.button<{
  $joined: boolean;
  $hoveringUnsubscribe?: boolean;
}>`
  padding: 10px 20px;
  color: var(--white);
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  background-color: ${({ $joined, $hoveringUnsubscribe }) => {
    if ($joined) {
      if ($hoveringUnsubscribe) {
        return "var(--cor-vermelho-cancelar, #DC3545)";
      }
      return "var(--cor-verde-inscrito, #22c55e)";
    }
    return "var(--logo-text)";
  }};

  &:hover:not(:disabled) {
    background-color: ${({ $joined, $hoveringUnsubscribe }) => {
      if ($joined) {
        if ($hoveringUnsubscribe) {
          return "var(--cor-vermelho-cancelar-hover, #c53030)";
        }
        return "var(--cor-verde-inscrito-hover, #16a34a)";
      }
      return "var(--color-azul-roxo)";
    }};
  }

  &:disabled {
    background-color: var(--color-dark-grey-text);
    cursor: not-allowed;
    opacity: 0.65;
  }
`;

export const ActionButton = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background-color: ${(props) =>
    props.$active ? "var(--background-dark-3)" : "transparent"};
  color: ${(props) =>
    props.$active ? "var(--white)" : "var(--user-tag-span)"};
  border: 1px solid var(--color-dark-grey-text);
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: var(--background-dark-3);
    color: var(--white);
  }
`;

export const DeleteEventButton = styled.button`
  padding: 10px 20px;
  color: var(--white);
  border: 1px solid var(--cor-vermelho-cancelar, #dc3545);
  background-color: transparent;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover:not(:disabled) {
    background-color: var(--cor-vermelho-cancelar, #dc3545);
    color: var(--white);
  }

  &:disabled {
    border-color: var(--color-dark-grey-text);
    color: var(--color-dark-grey-text);
    cursor: not-allowed;
    opacity: 0.65;
  }
`;
