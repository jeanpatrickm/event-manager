"use client";

import type React from "react";
import { type InputHTMLAttributes, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import * as S from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
  label: string;
  isPassword?: boolean;
}

export const Input: React.FC<InputProps> = ({
  icon,
  label,
  isPassword = false,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <S.InputContainer>
      <S.Label>{label}</S.Label>
      <S.InputWrapper>
        <S.IconWrapper>{icon}</S.IconWrapper>
        <S.StyledInput
          type={isPassword ? (showPassword ? "text" : "password") : rest.type}
          {...rest}
        />
        {isPassword && (
          <S.PasswordToggle onClick={togglePasswordVisibility}>
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </S.PasswordToggle>
        )}
      </S.InputWrapper>
    </S.InputContainer>
  );
};
