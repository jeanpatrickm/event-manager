"use client";

import type React from "react";
import { useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";
import {
  ProfileContainer,
  ProfileContent,
  EventsGrid,
  SectionTitle,
  SectionHeader
} from "./styles";
import EventCard from "../../components/Perfil/EventCard";
import TabNavigation from "../../components/Perfil/TabNavigation";
import { Container } from "../Home/styles";
import Sidebar from "../../components/CreateEvent/SideBar";
import { supabase } from "../../lib/supabase";
import { User } from "@supabase/supabase-js";
import TopBar from "../../components/CreateEvent/TopBar";

interface UserProfile {
  user_id: string;
}
interface ProfileEvent {
  evento_id: string;
  titulo: string;
  descricao: string | null;
  image_capa: string | null;
  max_participantes: number | null;
  data_evento: string; 
  inscricao: { count: number }[];
}

const MyEventsPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();

  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profileErrorMsg, setProfileErrorMsg] = useState<string | null>(null);

  const [createdEvents, setCreatedEvents] = useState<ProfileEvent[]>([]);
  const [joinedEvents, setJoinedEvents] = useState<ProfileEvent[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoadingProfile(true);
      setLoadingEvents(true);
      setProfileData(null);
      setProfileErrorMsg(null);
      
      try {
        const { data: { user: loggedInUser } } = await supabase.auth.getUser();
        
        setCurrentUser(loggedInUser);
        const idToFetch = userId || loggedInUser?.id;

        if (!idToFetch) {
          setProfileErrorMsg("Não foi possível identificar o perfil a ser exibido.");
          setLoadingProfile(false);
          setLoadingEvents(false);
          return;
        }

        const { data: userProfile, error: fetchProfileError } = await supabase
          .from("usuario")
          .select("user_id")
          .eq("user_id", idToFetch)
          .single();

        if (fetchProfileError && fetchProfileError.code !== "PGRST116") {
          throw fetchProfileError;
        }

        if (!userProfile) {
          setProfileErrorMsg("Página não encontrada.");
          setLoadingProfile(false);
          setLoadingEvents(false);
          return;
        }

        setProfileData(userProfile);
        setLoadingProfile(false);

        const [createdRes, inscriptionsRes] = await Promise.all([
          supabase
            .from("eventos")
            .select("*, inscricao(count)")
            .eq("user_id", idToFetch)
            // CORREÇÃO: Adicionado filtro para contar apenas inscrições aprovadas.
            .eq("inscricao.status", "aprovado")
            .order("data_criacao", { ascending: false }),
          supabase
            .from("inscricao")
            .select("eventos!inner(*, inscricao(count))")
            .eq("user_id", idToFetch)
            .eq("status", "aprovado") // Filtra apenas as inscrições que o usuário de fato participa (aprovadas)
            // CORREÇÃO: Adicionado filtro para a contagem aninhada.
            .eq("eventos.inscricao.status", "aprovado")
        ]);

        if (createdRes.error) throw createdRes.error;
        setCreatedEvents(createdRes.data || []);

        if (inscriptionsRes.error) throw inscriptionsRes.error;
        const joined = (inscriptionsRes.data || []).map(item => item.eventos).filter(Boolean) as ProfileEvent[];
        setJoinedEvents(joined || []);
        
      } catch (error: any) {
        console.error("Erro ao carregar dados da página:", error);
        setProfileErrorMsg("Ocorreu um erro ao carregar.");
      } finally {
        setLoadingProfile(false);
        setLoadingEvents(false);
      }
    };
    fetchAllData();
  }, [userId]);

  const today = new Date();
  today.setHours(23, 59, 59, 999);

  const tabs = [
    {
      id: "created",
      label: `Eventos Criados (${createdEvents.length})`,
      content: (
        <>
          <SectionHeader>
            <SectionTitle>Eventos Criados</SectionTitle>
          </SectionHeader>
          {loadingEvents ? (
            <p>Carregando...</p>
          ) : createdEvents.length === 0 ? (
            <p>Nenhum evento criado.</p>
          ) : (
            <EventsGrid>
              {createdEvents.map((event) => (
                <Link
                  key={event.evento_id}
                  to={`/event-details/${event.evento_id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <EventCard
                    id={event.evento_id}
                    title={event.titulo}
                    description={event.descricao || ""}
                    imageUrl={event.image_capa || "/placeholder.svg"}
                    isPast={new Date(event.data_evento) < today}
                    currentParticipants={event.inscricao[0]?.count ?? 0}
                    maxParticipants={event.max_participantes}
                  />
                </Link>
              ))}
            </EventsGrid>
          )}
        </>
      ),
    },
    {
      id: "joined",
      label: `Eventos Participando (${joinedEvents.length})`,
      content: (
        <>
          <SectionHeader>
            <SectionTitle>Eventos Participando</SectionTitle>
          </SectionHeader>
          {loadingEvents ? (
            <p>Carregando...</p>
          ) : joinedEvents.length === 0 ? (
            <p>Você não está participando de eventos.</p>
          ) : (
            <EventsGrid>
              {joinedEvents.map((event) => (
                <Link
                  key={event.evento_id}
                  to={`/event-details/${event.evento_id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <EventCard
                    id={event.evento_id}
                    title={event.titulo}
                    description={event.descricao || ""}
                    imageUrl={event.image_capa || "/placeholder.svg"}
                    isPast={new Date(event.data_evento) < today}
                    currentParticipants={event.inscricao[0]?.count ?? 0}
                    maxParticipants={event.max_participantes}
                  />
                </Link>
              ))}
            </EventsGrid>
          )}
        </>
      ),
    }
  ];

  if (loadingProfile) {
    return (
      <Container>
        <Sidebar />
        <ProfileContainer><div>Carregando...</div></ProfileContainer>
      </Container>
    );
  }
  if (profileErrorMsg) {
    return (
      <Container>
        <Sidebar />
        <ProfileContainer>
          <div>
            <h2>Erro</h2>
            <p>{profileErrorMsg}</p>
          </div>
        </ProfileContainer>
      </Container>
    );
  }
  if (!profileData) {
    return (
      <Container>
        <Sidebar />
        <ProfileContainer><p>Não foi possível carregar.</p></ProfileContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Sidebar />
      <ProfileContainer>
        <TopBar />
        <ProfileContent>
          <TabNavigation tabs={tabs} defaultTab={"created"} />
        </ProfileContent>
      </ProfileContainer>
    </Container>
  );
};

export default MyEventsPage;