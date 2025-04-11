import type React from "react";
import * as S from "./styles";

interface AuthCardProps {
  children: React.ReactNode;
}

export const AuthCard: React.FC<AuthCardProps> = ({ children }) => {
  return <S.CardContainer>{children}</S.CardContainer>;
};
