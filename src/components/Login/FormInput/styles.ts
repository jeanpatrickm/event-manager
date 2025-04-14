import styled from "styled-components";

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const IconWrapper = styled.div`
  position: absolute;
  left: 1rem;
  color: var(--color-ligth-grey-text);
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  background-color: var(--background-dark-e);
  border: 1px solid #3f3f5a;
  border-radius: 0.5rem;
  color: #fff;
  font-size: 0.875rem;

  &:focus {
    outline: none;
    border-color:  var(--logo-text-violeta);
  }

  &::placeholder {
    color: #64748b;
  }
`;
