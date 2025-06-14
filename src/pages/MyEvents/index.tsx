"use client";

import type React from "react";
import { useEffect, useState} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import TopBar from "../../components/Perfil/TopBar";

interface UserProfile {
  user_id: string;
  nome_usuario: string;
  email?: string;
  primeiro_nome?: string | null;
  sobrenome?: string | null;
  foto_perfil: string | null;
  biografia?: string | null;
  data_criacao?: string;
  data_atualizacao?: string;
  instagram_link?: string | null;
  linkedin_link?: string | null;
}
interface ProfileEvent {
  evento_id: string;
  titulo: string;
  descricao: string | null;
  image_capa: string | null;
  max_participantes: number | null;
}

const MyEventsPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profileErrorMsg, setProfileErrorMsg] = useState<string | null>(null);

  const [uploadError, setUploadError] = useState<string | null>(null);

  const [createdEvents, setCreatedEvents] = useState<ProfileEvent[]>([]);
  const [joinedEvents, setJoinedEvents] = useState<ProfileEvent[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [eventsErrorMsg, setEventsErrorMsg] = useState<string | null>(null);

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoadingProfile(true);
      setLoadingEvents(true);
      setProfileData(null);
      setProfileErrorMsg(null);
      setEventsErrorMsg(null);
      setUploadError(null);

      try {
        const {
          data: { user: loggedInUser },
          error: authError,
        } = await supabase.auth.getUser();
        if (authError) {
          console.error("Erro de autenticação:", authError?.message);
        }
        setCurrentUser(loggedInUser);

        const idToFetch = userId || loggedInUser?.id;

        if (!idToFetch) {
          setProfileErrorMsg(
            "Não foi possível identificar o perfil a ser exibido."
          );
          setLoadingProfile(false);
          setLoadingEvents(false);
          return;
        }

        const { data: userProfile, error: fetchProfileError } = await supabase
          .from("usuario")
          .select(
            "user_id, nome_usuario, email, primeiro_nome, sobrenome, foto_perfil, biografia, data_criacao, data_atualizacao, instagram_link, linkedin_link"
          )
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
            .select(
              "evento_id, titulo, descricao, image_capa, max_participantes"
            )
            .eq("user_id", idToFetch)
            .order("data_criacao", { ascending: false }),
          supabase
            .from("inscricao")
            .select("evento_id")
            .eq("user_id", idToFetch),
        ]);

        if (createdRes.error) {
          throw createdRes.error;
        }
        setCreatedEvents(createdRes.data || []);

        if (inscriptionsRes.error) {
          throw inscriptionsRes.error;
        }
        if (inscriptionsRes.data && inscriptionsRes.data.length > 0) {
          const eventIdsToFetch = inscriptionsRes.data.map(
            (insc) => insc.evento_id
          );
          const { data: joinedEventsData, error: joinedEventsError } =
            await supabase
              .from("eventos")
              .select(
                "evento_id, titulo, descricao, image_capa, max_participantes"
              )
              .in("evento_id", eventIdsToFetch)
              .order("data_evento", { ascending: true });
          if (joinedEventsError) {
            throw joinedEventsError;
          }
          setJoinedEvents(joinedEventsData || []);
        } else {
          setJoinedEvents([]);
        }
      } catch (error: any) {
        console.error("Erro ao carregar dados da página:", error);
        setProfileErrorMsg("Ocorreu um erro ao carregar.");
        setEventsErrorMsg("Ocorreu um erro ao carregar os eventos.");
      } finally {
        setLoadingProfile(false);
        setLoadingEvents(false);
      }
    };
    fetchAllData();
  }, [userId]);

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
                    imageUrl={
                      event.image_capa ||
                      "/placeholder.svg?height=200&width=300"
                    }
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
                    imageUrl={
                      event.image_capa ||
                      "/placeholder.svg?height=200&width=300"
                    }
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
        <ProfileContainer>
          <div>Carregando...</div>
        </ProfileContainer>
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
        <ProfileContainer>
          <p>Não foi possível carregar.</p>
        </ProfileContainer>
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
