import styled from "styled-components";

interface ButtonProps {
  fullWidth?: boolean;
}

export const StyledButton = styled.button<ButtonProps>`
  background-color: #8950fc;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  width: ${(props) => (props.fullWidth ? "100%" : "auto")};

  &:hover {
    background-color: #7337da;
  }

  &:disabled {
    background-color: #565674;
    cursor: not-allowed;
  }
`;
