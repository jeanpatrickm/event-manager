import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const TutorialOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
`;

export const TutorialPopupBox = styled.div`
  position: absolute;
  background-color: var(--background-dark-2);
  color: var(--white);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  z-index: 1001;
  width: 300px;
  border: 1px solid var(--logo-text);
  animation: ${fadeIn} 0.3s ease-out;

  h3 {
    margin-top: 0;
    margin-bottom: 10px;
    color: var(--logo-text);
  }

  p {
    margin-bottom: 20px;
    font-size: 14px;
    line-height: 1.5;
    color: var(--user-tag-ligth);
  }
`;

export const HighlightedElement = styled.div`
  position: absolute;
  border: 2px dashed var(--logo-text);
  border-radius: 8px;
  box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.6);
  pointer-events: none;
  z-index: 1000;
  transition: all 0.3s ease-in-out;
`;


export const TutorialControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StepCounter = styled.span`
  font-size: 12px;
  color: var(--user-tag-span);
`;

export const Button = styled.button`
  background: var(--logo-text);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--color-azul-roxo);
  }

  &:disabled {
    background-color: var(--color-grey-text);
    cursor: not-allowed;
  }
`;

export const CloseButton = styled(Button)`
  background: transparent;
  color: var(--user-tag-span);
  padding: 0;
  
  &:hover {
    background: transparent;
    color: var(--white);
  }
`;