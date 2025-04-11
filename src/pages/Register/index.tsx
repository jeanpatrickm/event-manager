import type React from "react";
import { Mail, Lock, User } from "lucide-react";
import { AuthCard } from "../../components/Register/AuthCard";
import { Input } from "../../components/Register/Input";
import { Button } from "../../components/Register/Button";
import { Checkbox } from "../../components/Register/CheckBox";
import {
  SocialLogin,
  SocialButton,
} from "../../components/Register/SocialLogin";
import SocialIcons from "../../components/Register/SocialIcons";
import * as S from "./styles";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
  return (
    <S.PageContainer>
      <S.ContentContainer>
        <S.LogoContainer></S.LogoContainer>

        <S.MainContent>
          <AuthCard>
            <S.CardHeader>
              <S.Title>Crie sua conta</S.Title>
              <S.Subtitle>
                Preencha os dados abaixo para se cadastrar
              </S.Subtitle>
            </S.CardHeader>

            <S.Form>
              <Input
                icon={<User size={20} />}
                label="Nome completo"
                placeholder="Seu nome completo"
              />

              <Input
                icon={<Mail size={20} />}
                label="Email"
                type="email"
                placeholder="Seu email"
              />

              <Input
                icon={<Lock size={20} />}
                label="Senha"
                isPassword
                placeholder="Sua senha"
              />

              <Input
                icon={<Lock size={20} />}
                label="Confirmar senha"
                isPassword
                placeholder="Confirme sua senha"
              />

              <Checkbox label="Aceito os termos e condições" />

              <Button fullWidth type="submit">
                Cadastrar
              </Button>

              <S.LoginLink>
                Já tem uma conta?{" "}
                <S.Link as={Link} to="/login">
                  Entrar
                </S.Link>
              </S.LoginLink>

              <SocialLogin>
                <SocialButton icon={<SocialIcons.Google />} />
                <SocialButton icon={<SocialIcons.Facebook />} />
                <SocialButton icon={<SocialIcons.Twitter />} />
              </SocialLogin>
            </S.Form>
          </AuthCard>
        </S.MainContent>
      </S.ContentContainer>
    </S.PageContainer>
  );
};

export default Register;
