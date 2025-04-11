import type React from "react";
import type { InputHTMLAttributes } from "react";
import * as S from "./styles";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, ...rest }) => {
  return (
    <S.CheckboxContainer>
      <S.StyledCheckbox type="checkbox" {...rest} />
      <S.Label>{label}</S.Label>
    </S.CheckboxContainer>
  );
};
