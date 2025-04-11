import type React from "react";
import * as S from "./styles";

interface SocialLoginProps {
  children: React.ReactNode;
}

export const SocialLogin: React.FC<SocialLoginProps> = ({ children }) => {
  return (
    <S.SocialLoginContainer>
      <S.Divider>
        <S.DividerText>Ou continue com</S.DividerText>
      </S.Divider>
      <S.SocialButtonsContainer>{children}</S.SocialButtonsContainer>
    </S.SocialLoginContainer>
  );
};

export const SocialButton: React.FC<{ icon: React.ReactNode }> = ({ icon }) => {
  return <S.SocialButtonWrapper>{icon}</S.SocialButtonWrapper>;
};
