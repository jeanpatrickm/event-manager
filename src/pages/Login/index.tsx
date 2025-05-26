"use client";

import type React from "react";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import {
  Container,
  LeftSection,
  Logo,
  GradientCard,
  CardTitle,
  CardText,
  RightSection,
  LoginCard,
  LoginHeader,
  LoginSubtitle,
  Form,
  FormGroup,
  Label,
  InputWrapper,
  IconWrapper,
  Input,
  PasswordToggle,
  RememberForgotRow,
  CheckboxWrapper,
  Checkbox,
  CheckboxLabel,
  ForgotPassword,
  SubmitButton,
  SignupText,
  SignupLink,
  SocialLoginSection,
  SocialDivider,
  SocialButtons,
  SocialButton,
} from "./styles";
import SocialIcons from "../../components/Login/SocialIcons";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

const LoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null); // Novo estado para erros
  const navigate = useNavigate();

  async function signInUser(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) throw error;
    return data;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError(null); // Limpa qualquer erro anterior

    signInUser(email, password)
      .then((data) => {
        console.log("Login bem-sucedido:", data);
        navigate("/");
      })
      .catch((error) => {
        console.error("Erro ao fazer login:", error);
        setLoginError(error.message || "Ocorreu um erro ao fazer login."); // Exibe a mensagem de erro
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Container>
      <LeftSection>
        <Logo>Event Manager</Logo>
        <GradientCard>
          <CardTitle>Gerencie seus eventos</CardTitle>
          <CardText>
            Organize, promova e acompanhe seus eventos em uma única plataforma
          </CardText>
        </GradientCard>
      </LeftSection>

      <RightSection>
        <LoginCard>
          <LoginHeader>Bem-vindo de volta</LoginHeader>
          <LoginSubtitle>Entre com sua conta para continuar</LoginSubtitle>

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Email</Label>
              <InputWrapper>
                <IconWrapper>
                  <Mail size={18} />
                </IconWrapper>
                <Input
                  type="email"
                  placeholder="Seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </InputWrapper>
            </FormGroup>
            <FormGroup>
              <Label>Senha</Label>
              <InputWrapper>
                <IconWrapper>
                  <Lock size={18} />
                </IconWrapper>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <PasswordToggle
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </PasswordToggle>
              </InputWrapper>
            </FormGroup>
            <RememberForgotRow>
              <CheckboxWrapper>
                <Checkbox
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <CheckboxLabel htmlFor="remember">Lembrar-me</CheckboxLabel>
              </CheckboxWrapper>
              <ForgotPassword href="#">Esqueceu a senha?</ForgotPassword>
            </RememberForgotRow>
            {loginError && <p style={{ color: "red" }}>{loginError}</p>}{" "}
            {/* Exibe a mensagem de erro */}
            <SubmitButton type="submit" disabled={isLoading}>
              Entrar
            </SubmitButton>
          </Form>

          <SignupText>
            Não tem uma conta?{" "}
            <SignupLink as={Link} to="/register">
              Cadastre-se
            </SignupLink>
          </SignupText>

          <SocialLoginSection>
            <SocialDivider>Ou continue com</SocialDivider>
            <SocialButtons>
              <SocialButton>
                <SocialIcons.Google />
              </SocialButton>
              <SocialButton>
                <SocialIcons.Facebook />
              </SocialButton>
              <SocialButton>
                <SocialIcons.Twitter />
              </SocialButton>
            </SocialButtons>
          </SocialLoginSection>
        </LoginCard>
      </RightSection>
    </Container>
  );
};

export default LoginPage;
