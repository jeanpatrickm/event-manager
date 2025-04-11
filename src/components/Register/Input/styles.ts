import styled from "styled-components";

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 16px;
`;

export const Label = styled.label`
  font-size: 14px;
  margin-bottom: 8px;
  color: #fff;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  background-color: #1e1e2d;
  border-radius: 6px;
  overflow: hidden;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  color: #6c7293;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 12px 40px 12px 0;
  background-color: transparent;
  border: none;
  color: #fff;
  font-size: 14px;
  outline: none;

  &::placeholder {
    color: #6c7293;
  }
`;

export const PasswordToggle = styled.div`
  position: absolute;
  right: 12px;
  cursor: pointer;
  color: #6c7293;
  display: flex;
  align-items: center;
`;
