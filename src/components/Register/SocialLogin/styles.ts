import styled from "styled-components";

export const SocialLoginContainer = styled.div`
  width: 100%;
  margin-top: 24px;
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background-color: #2b2b40;
  }
`;

export const DividerText = styled.span`
  padding: 0 16px;
  color: var(--color-grey-text);
  font-size: 14px;
`;

export const SocialButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 16px;
`;

export const SocialButtonWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #1e1e2d;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  color: var(--color-grey-text);

  &:hover {
    background-color: #2b2b40;
  }
`;
