import React, { useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage(null);

    if (!name) {
      setErrorMessage("Por favor, preencha seu nome completo.");
      return;
    }

    if (!email) {
      setErrorMessage("Por favor, preencha seu email.");
      return;
    }

    if (!password) {
      setErrorMessage("Por favor, preencha sua senha.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("As senhas não coincidem.");
      return;
    }

    if (!termsAccepted) {
      setErrorMessage("Você precisa aceitar os termos e condições.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message);
      } else {
        console.log(data)
        // await supabase.from("profiles").insert([{ id: data?.user?.id, full_name: name }]);
        navigate("/login");
      }
    } catch (error: any) {
      setErrorMessage(error.message || "Ocorreu um erro ao criar sua conta.");
    } finally {
      setLoading(false);
    }
  };

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

            <S.Form onSubmit={handleSignUp}>
              <Input
                icon={<User size={20} />}
                label="Nome completo"
                placeholder="Seu nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <Input
                icon={<Mail size={20} />}
                label="Email"
                type="email"
                placeholder="Seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                icon={<Lock size={20} />}
                label="Senha"
                isPassword
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Input
                icon={<Lock size={20} />}
                label="Confirmar senha"
                isPassword
                placeholder="Confirme sua senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <Checkbox
                label="Aceito os termos e condições"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />

              {errorMessage && <p>{errorMessage}</p>}

              <Button fullWidth type="submit" disabled={loading}>
                {loading ? "Cadastrando..." : "Cadastrar"}
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
