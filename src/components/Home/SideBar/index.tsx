"use client";

import type React from "react";
import { useEffect, useState } from "react";
// Importe o ícone que usaremos e o nosso novo store
import { Home, Calendar, UserRound, HelpCircle } from "lucide-react"; 
import { useTutorialStore, TutorialStep } from "../../../stores/tutorialStore";
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

// ... (mantenha a interface UserProfileSidebar e o resto do componente igual)
interface UserProfileSidebar {
  foto_perfil: string | null;
  nome_usuario: string;
  primeiro_nome?: string | null;
}

// Passos do tutorial para a página principal
const homePageTutorialSteps: TutorialStep[] = [
  {
    title: "Barra de Busca",
    content: "Utilize esta barra para encontrar eventos públicos por título ou descrição.",
    targetSelector: "#search-container-header" 
  },
  {
    title: "Notificações",
    content: "Clique aqui para visualizar as atualizações de eventos onde está inscrito.",
    targetSelector: "#nav-notifications" 
  },
  {
    title: "Configurações",
    content: "Clique aqui para fazer log-out.",
    targetSelector: "#nav-config" 
  },
  {
    title: "Perfil",
    content: "Clique aqui para visualizar suas informações básicas.",
    targetSelector: "#nav-perfil" 
  },
  {
    title: "Início",
    content: "Clique aqui para ir à página principal, onde ficam os eventos públicos disponíveis para participação.",
    targetSelector: "#nav-home" 
  },
  {
    title: "Criar Evento",
    content: "Clique aqui para ir à página de criação e começar a organizar seu próprio evento.",
    targetSelector: "#nav-create-event"
  },
  {
    title: "Meus Eventos",
    content: "Clique aqui para ir à página de eventos criados por você.",
    targetSelector: "#nav-my-events"
  },
  {
    title: "Eventos Públicos",
    content: "Nesta seção, você verá todos os eventos públicos disponíveis. Clique em um para ver mais detalhes.",
    targetSelector: ".section-content-home"
  }
];


const Sidebar: React.FC = () => {
  // ... (mantenha os hooks useState, useLocation, useEffect existentes)
  const [currentUserProfile, setCurrentUserProfile] =
    useState<UserProfileSidebar | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const location = useLocation();

  // Pegue a função para iniciar o tutorial do store
  const startTutorial = useTutorialStore((state) => state.startTutorial);

  useEffect(() => {
    // ... (seu código do useEffect para buscar dados do usuário)
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


  const isActive = (path: string) => location.pathname === path;

  const handleStartTutorial = () => {
    // Adicione aqui os passos específicos para a página atual
    // Por enquanto, usaremos os passos da Home como exemplo
    startTutorial(homePageTutorialSteps);
  };
  
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
       <Row id="nav-perfil">
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
        <NavItem id="nav-home">
          <NavLink as={Link} to="/" $active={isActive("/")}>
            <Home size={20} />
            <NavText>Início</NavText>
          </NavLink>
        </NavItem>
        {/* Adicione um id para que o tutorial possa encontrá-lo */}
        <NavItem id="nav-create-event"> 
          <NavLink
            as={Link}
            to="/create-event"
            $active={isActive("/create-event")}
          >
            <Calendar size={20} />
            <NavText>Criar Evento</NavText>
          </NavLink>
        </NavItem>
        <NavItem id="nav-my-events">
          <NavLink as={Link} to="/MyEvents" $active={isActive("/MyEvents")}>
            <UserRound size={20} />
            <NavText>Meus eventos</NavText>
          </NavLink>
        </NavItem>

        {/* NOVO ITEM DO TUTORIAL */}
        <NavItem>
          {/* Usamos um `div` em vez de `Link` porque não vai para uma página nova */}
          <NavLink as="div" onClick={handleStartTutorial} $active={false} style={{cursor: 'pointer'}}>
            <HelpCircle size={20} />
            <NavText>Tutorial</NavText>
          </NavLink>
        </NavItem>
      </NavList>
    </SidebarContainer>
  );
};

export default Sidebar;