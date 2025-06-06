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
  margin-bottom: 24px;
`;

export const CommentInput = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  background-color: var(--background-dark-3);
  border: 1px solid var(--color-dark-grey-text);
  border-radius: 6px;
  color: var(--white);
  font-size: 14px;
  resize: vertical;
  min-height: 45px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: var(--logo-text);
  }

  &::placeholder {
    color: var(--color-grey-text);
  }
`;

export const CommentButton = styled.button`
  padding: 10px 20px;
  background-color: var(--logo-text);
  color: var(--white);
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: var(--color-azul-roxo);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
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
  white-space: pre-wrap;
  word-break: break-word;
`;

// --- NOVOS ESTILOS ADICIONADOS ABAIXO ---

export const FileInputLabel = styled.label<{ disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 12px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  color: var(--user-tag-span);
  border: 1px solid var(--color-dark-grey-text);
  border-radius: 6px;
  font-size: 14px;
  transition: background-color 0.2s, color 0.2s;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  &:hover {
    background-color: ${({ disabled }) =>
      disabled ? "transparent" : "var(--background-dark-3)"};
    color: ${({ disabled }) =>
      disabled ? "var(--user-tag-span)" : "var(--white)"};
  }
`;

export const AttachedImagePreviewContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  position: relative;
  display: inline-block;
`;

export const AttachedImagePreview = styled.img`
  display: block;
  max-width: 150px;
  max-height: 150px;
  border-radius: 4px;
  border: 1px solid var(--color-dark-grey-text);
`;

export const RemoveAttachedImageButton = styled.button`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: rgba(40, 40, 40, 0.8);
  color: white;
  border: 1px solid var(--white);
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(220, 53, 69, 0.9);
  }

  svg {
    stroke-width: 2.5px;
  }
`;
