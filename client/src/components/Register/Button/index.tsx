import type React from "react";
import type { ButtonHTMLAttributes } from "react";
import * as S from "./styles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  fullWidth = false,
  ...rest
}) => {
  return (
    <S.StyledButton fullWidth={fullWidth} {...rest}>
      {children}
    </S.StyledButton>
  );
};
