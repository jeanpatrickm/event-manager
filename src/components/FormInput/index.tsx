"use client";

import type React from "react";
import { IconWrapper, Input, InputWrapper } from "./styles";

interface FormInputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: React.ReactNode;
  required?: boolean;
  rightElement?: React.ReactNode;
}

const FormInput: React.FC<FormInputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  icon,
  required = false,
  rightElement,
}) => {
  return (
    <InputWrapper>
      <IconWrapper>{icon}</IconWrapper>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
      {rightElement}
    </InputWrapper>
  );
};

export default FormInput;
