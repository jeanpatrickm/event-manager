import styled from "styled-components";

export const ParticipantsContainer = styled.section`
  background-color: #2a2a3a;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
`;

export const ParticipantsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  h3 {
    font-size: 18px;
    font-weight: 600;
    color: #ffffff;
  }

  a {
    font-size: 14px;
    color: #8a5cf6;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ParticipantsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(6, 1fr);
  }
`;

export const ParticipantItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const ParticipantAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #3a3a4a;
`;

export const ParticipantName = styled.span`
  font-size: 14px;
  color: #c4c4d4;
  text-align: center;
`;
