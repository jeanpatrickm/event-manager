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

// Props do SocialButton atualizadas para incluir o onClick
interface SocialButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
}

export const SocialButton: React.FC<SocialButtonProps> = ({
  icon,
  onClick,
}) => {
  return <S.SocialButtonWrapper onClick={onClick}>{icon}</S.SocialButtonWrapper>;
};