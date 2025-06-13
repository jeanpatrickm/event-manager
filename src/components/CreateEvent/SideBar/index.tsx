"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Home, Calendar, UserRound } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { supabase } from "../../../lib/supabase";

import {
  SidebarContainer,
  Logo,
  NavList,
  NavItem,
  NavLink,
  NavText,
  Row,
  UserContainer,
  UserAvatar,
  UserInfo,
  UserName,
  UserTag,
} from "./styles";

interface UserProfileSidebar {
  foto_perfil: string | null;
  nome_usuario: string;
  primeiro_nome?: string | null;
}

const Sidebar: React.FC = () => {
  const [currentUserProfile, setCurrentUserProfile] =
    useState<UserProfileSidebar | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoadingProfile(true);
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        console.log("Usuário não autenticado ou erro ao buscar usuário.");
        setCurrentUserProfile(null);
        setIsLoadingProfile(false);
        return;
      }

      // Buscar dados do perfil na tabela 'usuario'
      const { data: profile, error: profileError } = await supabase
        .from("usuario") // Nome da sua tabela de usuários
        .select("foto_perfil, nome_usuario, primeiro_nome")
        .eq("user_id", user.id)
        .single();

      if (profileError || !profile) {
        console.error(
          "Erro ao buscar perfil do usuário ou perfil não encontrado:",
          profileError
        );
        // Fallback se o perfil não for encontrado, mas o usuário estiver logado
        setCurrentUserProfile({
          foto_perfil: "/images/default-avatar.png",
          nome_usuario: user.email?.split("@")[0] || "usuário",
          primeiro_nome: "Usuário",
        });
      } else {
        setCurrentUserProfile(profile);
      }
      setIsLoadingProfile(false);
    };

    fetchUserData();

    // Listener para mudanças no estado de autenticação
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Evento de autenticação:", event, session);
        // Recarrega os dados do usuário em eventos relevantes
        if (
          event === "SIGNED_IN" ||
          event === "USER_UPDATED" ||
          event === "SIGNED_OUT"
        ) {
          fetchUserData();
        }
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  // Função para verificar se o link está ativo
  const isActive = (path: string) => location.pathname === path;

  // Determinar informações de exibição do usuário
  const displayName =
    currentUserProfile?.primeiro_nome ||
    currentUserProfile?.nome_usuario ||
    "Usuário";
  const usernameTag = currentUserProfile?.nome_usuario
    ? `@${currentUserProfile.nome_usuario}`
    : "";
  const avatarSrc =
    currentUserProfile?.foto_perfil || "/images/default-avatar.png"; // Avatar padrão

  return (
    <SidebarContainer>
      <Row>
        {isLoadingProfile ? (
          <UserContainer style={{ padding: "10px 0", minHeight: "70px" }}>
            <UserAvatar src="/images/default-avatar.png" alt="Carregando..." />
          </UserContainer>
        ) : currentUserProfile ? (
          <Link
            to="/perfil"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <UserContainer>
              <UserAvatar src={avatarSrc} alt={displayName} />
              <UserInfo>
                <UserName>{displayName}</UserName>
                {usernameTag && <UserTag>{usernameTag}</UserTag>}
              </UserInfo>
            </UserContainer>
          </Link>
        ) : (
          <UserContainer style={{ padding: "10px 0", minHeight: "70px" }}>
            <UserAvatar src="/images/default-avatar.png" alt="Convidado" />
            <UserInfo>
              <UserName>Convidado</UserName>
            </UserInfo>
          </UserContainer>
        )}
        <Logo>
          <Link
            to="/"
            style={{ textDecoration: "none", color: "inherit" }}
          ></Link>
        </Logo>
      </Row>

      <NavList>
        <NavItem>
          <NavLink as={Link} to="/" $active={isActive("/")}>
            <Home size={20} />
            <NavText>Início</NavText>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            as={Link}
            to="/create-event"
            $active={isActive("/create-event")}
          >
            <Calendar size={20} />
            <NavText>Criar Evento</NavText>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink as={Link} to="/perfil" $active={isActive("/perfil")}>
            <UserRound size={20} />
            <NavText>Meus eventos</NavText>
          </NavLink>
        </NavItem>
      </NavList>
    </SidebarContainer>
  );
};

export default Sidebar;
