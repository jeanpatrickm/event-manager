import styled from "styled-components";

export const InfoSection = styled.section`
  background-color: #2a2a3a;
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
  color: #a0a0b0;
  margin-bottom: 6px;

  svg {
    margin-right: 8px;
  }
`;

export const InfoValue = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
`;

export const TagItem = styled.div`
  padding: 6px 12px;
  background-color: #3a3a4a;
  border-radius: 20px;
  font-size: 12px;
  color: #c4c4d4;
`;

export const ActionButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export const JoinEventButton = styled.button<{ $joined: boolean }>`
  padding: 10px 20px;
  background-color: ${(props) => (props.$joined ? "#22c55e" : "#8a5cf6")};
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => (props.$joined ? "#16a34a" : "#7349e3")};
  }

  &:disabled {
    background-color: #4a4a5a;
    cursor: not-allowed;
  }
`;

export const ActionButton = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background-color: ${(props) => (props.$active ? "#3a3a4a" : "transparent")};
  color: ${(props) => (props.$active ? "#ffffff" : "#a0a0b0")};
  border: 1px solid #4a4a5a;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #3a3a4a;
    color: #ffffff;
  }
`;
