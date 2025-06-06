import styled from "styled-components";

interface InputProps {
  hasError?: boolean;
}

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

export const FormContainer = styled.div`
  max-width: 900px;
  margin: 20px auto;
  padding: 20px;
  background-color: var(--background-dark-2);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

export const Header = styled.div`
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--background-dark-3);
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: var(--white);
`;

export const FormSection = styled.div`
  margin-bottom: 24px;
  padding: 16px;
  background-color: #2f2f3f;
  border-radius: 8px;
`;

export const InputGroup = styled.div`
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--user-tag-ligth);

  svg {
    margin-right: 8px;
  }
`;

export const Input = styled.input<InputProps>`
  width: 100%;
  padding: 10px 12px;
  background-color: var(--background-dark-3);
  border: 1px solid
    ${(props) => (props.hasError ? "#ff5555" : "var(--color-dark-grey-text)")};
  border-radius: 6px;
  color: var(--white);
  font-size: 14px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: ${(props) =>
      props.hasError ? "#ff5555" : " var(--logo-text)"};
  }

  &::placeholder {
    color: var(--color-grey-text);
  }

  &[type="file"] {
    padding: 8px;

    &::file-selector-button {
      background-color: var(--background-dark-3);
      color: var(--white);
      border: 1px solid var(--color-dark-grey-text);
      border-radius: 4px;
      padding: 6px 12px;
      margin-right: 12px;
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover {
        background-color: var(--color-dark-grey-text);
      }
    }
  }
`;

export const TextArea = styled(Input).attrs({ as: "textarea" })<InputProps>`
  resize: vertical;
  min-height: 100px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
`;

export const Button = styled.button<{ variant: "primary" | "secondary" }>`
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  background-color: ${(props) =>
    props.variant === "primary" ? " var(--logo-text)" : "transparent"};
  color: ${(props) =>
    props.variant === "primary" ? "var(--white)" : "var(--user-tag-ligth)"};
  border: ${(props) =>
    props.variant === "primary"
      ? "none"
      : "1px solid var(--color-dark-grey-text)"};

  &:hover {
    background-color: ${(props) =>
      props.variant === "primary"
        ? "var(--color-azul-roxo)"
        : "var(--background-dark-3)"};
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const ImagePreviewContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 300px;
  margin-top: 8px;
`;

export const ImagePreview = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
`;

export const RemoveImageButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.6);
  color: var(--white);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`;

export const TagItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  background-color: var(--background-dark-3);
  border-radius: 16px;
  font-size: 12px;

  svg {
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.2s;

    &:hover {
      opacity: 1;
    }
  }
`;

export const TagInput = styled(Input)`
  margin-bottom: 0;
`;

export const ErrorMessage = styled.p`
  color: #ff5555;
  font-size: 12px;
  margin-top: 4px;
`;

export const RadioGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 8px;
`;

export const RadioOption = styled.div`
  display: flex;
  align-items: center;
`;

export const RadioInput = styled.input`
  margin-right: 8px;
  accent-color: var(--logo-text);
`;

export const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: var(--user-tag-ligth);
  cursor: pointer;
`;
