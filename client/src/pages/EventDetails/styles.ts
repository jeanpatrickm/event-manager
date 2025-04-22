import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: var(--background-dark-e);
  color: var(--white);

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
  color: var(--user-tag-span);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;

  &:hover {
    color: var(--white);
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
  background-color: var(--background-dark-2);
`;

export const EventTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 16px;
  color: var(--white);
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
  background-color: var(--background-dark-3);
`;

export const OrganizerInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const OrganizerName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: var(--white);
`;

export const OrganizerTitle = styled.span`
  font-size: 12px;
  color: var(--user-tag-span);
`;

export const EventDescription = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: var(--user-tag-ligth);
  margin-bottom: 24px;
`;

export const EventInfoSection = styled.section`
  background-color: var(--background-dark-2);
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
  color: var(--user-tag-span);
  margin-bottom: 6px;

  svg {
    margin-right: 8px;
  }
`;

export const InfoValue = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: var(--white);
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

export const JoinEventButton = styled.button<{ $joined: boolean }>`
  padding: 10px 20px;
  background-color: ${(props) => (props.$joined ? "#22c55e" : " var(--logo-text)")};
  color: var(--white);
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => (props.$joined ? "#16a34a" : "var(--color-azul-roxo)")};
  }

  &:disabled {
    background-color: var(--color-dark-grey-text);
    cursor: not-allowed;
  }
`;

export const ActionButton = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background-color: ${(props) => (props.$active ? "var(--background-dark-3)" : "transparent")};
  color: ${(props) => (props.$active ? "var(--white)" : "var(--user-tag-span)")};
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

export const ParticipantsSection = styled.section`
  background-color: var(--background-dark-2);
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
    color: var(--white);
  }

  a {
    font-size: 14px;
    color:  var(--logo-text);
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
  background-color: var(--background-dark-3);
`;

export const ParticipantName = styled.span`
  font-size: 14px;
  color: var(--user-tag-ligth);
  text-align: center;
`;

export const DiscussionSection = styled.section`
  background-color: var(--background-dark-2);
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
    color: var(--white);
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
  background-color: var(--background-dark-3);
  border: 1px solid var(--color-dark-grey-text);
  border-radius: 6px;
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

export const CommentButton = styled.button`
  padding: 0 20px;
  background-color:  var(--logo-text);
  color: var(--white);
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--color-azul-roxo);
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
  color: var(--white);
`;

export const CommentTime = styled.span`
  font-size: 12px;
  color: var(--color-grey-text);
`;

export const CommentContent = styled.p`
  font-size: 14px;
  line-height: 1.5;
  color: var(--user-tag-ligth);
`;
