import styled from "styled-components";

export const DiscussionContainer = styled.section`
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

export const CommentAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  background-color: var(--background-dark-3);
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
