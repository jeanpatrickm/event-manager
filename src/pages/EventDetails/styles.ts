import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #1e1e2e;
  color: #ffffff;

  .main-content {
    flex: 1;
    overflow-y: auto;
    padding-bottom: 40px;
  }
`;

export const ContentContainer = styled.div`
  max-width: 900px;
  margin: 20px auto;
  padding: 0 20px;
`;

export const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  color: #a0a0b0;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;

  &:hover {
    color: #ffffff;
  }

  svg {
    margin-right: 6px;
  }
`;

export const EventStatusBadge = styled.div<{ color: string }>`
  padding: 6px 12px;
  background-color: ${(props) => props.color}20;
  color: ${(props) => props.color};
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
`;

export const EventCoverImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 24px;
  background-color: #2a2a3a;
`;

export const EventTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #ffffff;
`;

export const EventOrganizer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const OrganizerAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
  background-color: #3a3a4a;
`;

export const OrganizerInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const OrganizerName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
`;

export const OrganizerTitle = styled.span`
  font-size: 12px;
  color: #a0a0b0;
`;

export const EventDescription = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #c4c4d4;
  margin-bottom: 24px;
`;

export const EventInfoSection = styled.section`
  background-color: #2a2a3a;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
`;

export const EventInfoGrid = styled.div`
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

export const ParticipantsSection = styled.section`
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

export const ParticipantsList = styled.div`
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

export const DiscussionSection = styled.section`
  background-color: #2a2a3a;
  border-radius: 12px;
  padding: 24px;
`;

export const DiscussionHeader = styled.div`
  margin-bottom: 20px;

  h3 {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 18px;
    font-weight: 600;
    color: #ffffff;
  }
`;

export const CommentForm = styled.form`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
`;

export const CommentInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  background-color: #3a3a4a;
  border: 1px solid #4a4a5a;
  border-radius: 6px;
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

export const CommentButton = styled.button`
  padding: 0 20px;
  background-color: #8a5cf6;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #7349e3;
  }
`;

export const CommentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const CommentItem = styled.div`
  display: flex;
  gap: 12px;
`;

export const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`;

export const CommentAuthor = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
`;

export const CommentTime = styled.span`
  font-size: 12px;
  color: #6c6c7c;
`;

export const CommentContent = styled.p`
  font-size: 14px;
  line-height: 1.5;
  color: #c4c4d4;
`;
