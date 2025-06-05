"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { User } from "@supabase/supabase-js";

import {
  Container,
  ContentContainer,
  EventCoverImage,
  EventTitle,
  EventDescription,
} from "./styles";
import TopBar from "../../components/CreateEvent/TopBar";
import Sidebar from "../../components/CreateEvent/SideBar";
import EventHeader from "../../components/EventDetails/EventHeader";
import EventOrganizer from "../../components/EventDetails/EventOrganizer";
import EventInfo from "../../components/EventDetails/EventInfo";
import ParticipantsList from "../../components/EventDetails/ParticipantsList";

// --- INÍCIO DAS INTERFACES ---
interface OrganizerData {
  user_id: string;
  nome_completo: string;
  foto_perfil: string | null;
}

interface CategoryData {
  cod_categoria: number;
  categoria: string;
}

interface DetailedEventData {
  evento_id: string;
  titulo: string;
  descricao: string;
  image_capa: string | null;
  data_evento: string;
  horario: string;
  local: string | null;
  max_participantes: number | null;
  presencial: boolean;
  link_online: string | null;
  user_id: string;
  cod_categoria: number;
  tags: string | null;
  organizador?: OrganizerData;
  categoria_info?: CategoryData;
}

interface ParticipantData {
  user_id: string;
  nome_completo: string;
  foto_perfil: string | null;
}

/* // Interface para comentários 
interface CommentDBData {
  comentario_id: string;
  texto: string;
  data: string;
  user_id: string;
  autor_nome: string;
  autor_avatar: string | null;
}
*/
// --- FIM DAS INTERFACES ---

type EventStatus = "upcoming" | "ongoing" | "past" | "undefined";

const EventDetails: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [eventData, setEventData] = useState<DetailedEventData | null>(null);
  const [participants, setParticipants] = useState<ParticipantData[]>([]);
  // const [comments, setComments] = useState<CommentDBData[]>([]); // Comentado
  const [isJoined, setIsJoined] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingInteraction, setLoadingInteraction] = useState(false);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setCurrentUser(user);
    };
    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setCurrentUser(session?.user ?? null);
      }
    );
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!eventId) {
      setError("ID do evento não fornecido.");
      setLoading(false);
      return;
    }

    const fetchEventDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        // 1. Buscar dados do evento
        const { data: eventResult, error: eventError } = await supabase
          .from("eventos")
          .select(
            `
            *,
            usuario:user_id ( user_id, primeiro_nome, sobrenome, foto_perfil, nome_usuario ),
            categoria_info:cod_categoria ( cod_categoria, categoria )
          `
          )
          .eq("evento_id", eventId)
          .single();

        if (eventError) throw eventError;
        if (!eventResult) throw new Error("Evento não encontrado.");

        const fetchedEventData: DetailedEventData = {
          ...eventResult,
          organizador: eventResult.usuario
            ? {
                user_id: eventResult.usuario.user_id,
                nome_completo:
                  `${eventResult.usuario.primeiro_nome || ""} ${
                    eventResult.usuario.sobrenome || ""
                  }`.trim() ||
                  eventResult.usuario.nome_usuario ||
                  "Organizador",
                foto_perfil: eventResult.usuario.foto_perfil,
              }
            : undefined,
          categoria_info: eventResult.categoria_info
            ? {
                cod_categoria: eventResult.categoria_info.cod_categoria,
                categoria: eventResult.categoria_info.categoria,
              }
            : undefined,
        };
        setEventData(fetchedEventData);

        // 2. Buscar participantes
        const { data: participantsResult, error: participantsError } =
          await supabase
            .from("inscricao")
            .select(
              `
            user_id,
            usuario:user_id (user_id, primeiro_nome, sobrenome, foto_perfil, nome_usuario)
          `
            )
            .eq("evento_id", eventId);

        if (participantsError) throw participantsError;
        const fetchedParticipants: ParticipantData[] = (
          participantsResult || []
        ).map((p) => ({
          user_id: p.usuario.user_id,
          nome_completo:
            `${p.usuario.primeiro_nome || ""} ${
              p.usuario.sobrenome || ""
            }`.trim() ||
            p.usuario.nome_usuario ||
            "Participante",
          foto_perfil: p.usuario.foto_perfil,
        }));
        setParticipants(fetchedParticipants);

        if (
          currentUser &&
          fetchedParticipants.some((p) => p.user_id === currentUser.id)
        ) {
          setIsJoined(true);
        } else {
          setIsJoined(false);
        }

        /* // 3. Buscar comentários - Comentado
        const { data: commentsResult, error: commentsError } = await supabase
          .from("comentario")
          .select(\`
            comentario_id, texto, data, user_id,
            usuario:user_id (user_id, primeiro_nome, sobrenome, foto_perfil, nome_usuario)
          \`)
          .eq("evento_id", eventId) // Esta linha causava o erro
          .order("data", { ascending: false });

        if (commentsError) throw commentsError;
        const fetchedComments: CommentDBData[] = (commentsResult || []).map(c => ({
            comentario_id: c.comentario_id,
            texto: c.texto,
            data: c.data,
            user_id: c.user_id,
            autor_nome: \`\${c.usuario.primeiro_nome || ''} \${c.usuario.sobrenome || ''}\`.trim() || c.usuario.nome_usuario || 'Usuário',
            autor_avatar: c.usuario.foto_perfil
        }));
        setComments(fetchedComments);
        */
      } catch (err: any) {
        console.error("Erro ao buscar detalhes do evento:", err);

        setError(err.message || "Falha ao carregar detalhes do evento.");
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId, currentUser]);

  const handleJoinEvent = async () => {
    if (!currentUser) {
      alert("Você precisa estar logado para interagir com o evento.");
      return;
    }
    if (!eventData) return;
    setLoadingInteraction(true);
    try {
      if (isJoined) {
        const { error: deleteError } = await supabase
          .from("inscricao")
          .delete()
          .match({ evento_id: eventData.evento_id, user_id: currentUser.id });
        if (deleteError) throw deleteError;
        setIsJoined(false);
        setParticipants((prev) =>
          prev.filter((p) => p.user_id !== currentUser.id)
        );
      } else {
        const { error: insertError } = await supabase
          .from("inscricao")
          .insert([
            { evento_id: eventData.evento_id, user_id: currentUser.id },
          ]);
        if (insertError) throw insertError;
        setIsJoined(true);
        const userProfile = await supabase
          .from("usuario")
          .select("primeiro_nome, sobrenome, foto_perfil, nome_usuario")
          .eq("user_id", currentUser.id)
          .single();
        if (userProfile.data) {
          setParticipants((prev) => [
            ...prev,
            {
              user_id: currentUser.id,
              nome_completo:
                `${userProfile.data.primeiro_nome || ""} ${
                  userProfile.data.sobrenome || ""
                }`.trim() ||
                userProfile.data.nome_usuario ||
                "Você",
              foto_perfil: userProfile.data.foto_perfil,
            },
          ]);
        }
      }
    } catch (err: any) {
      console.error("Erro na interação de inscrição:", err);
      alert(err.message || "Falha ao processar inscrição.");
    } finally {
      setLoadingInteraction(false);
    }
  };

  /* // Função handleAddComment 
  const handleAddComment = async (content: string) => {
    if (!currentUser) {
      alert("Você precisa estar logado para comentar.");
      return;
    }
    if (!eventData || content.trim() === "") return;
    setLoadingInteraction(true);
    try {
      // A lógica de inserção de comentário iria aqui,
      // mas precisaria da coluna evento_id na tabela comentario.
      alert("Funcionalidade de adicionar comentário temporariamente desabilitada.");
    } catch (err: any) {
      console.error("Erro ao adicionar comentário:", err);
      alert(err.message || "Falha ao adicionar comentário.");
    } finally {
      setLoadingInteraction(false);
    }
  };
  */

  const getEventStatus = (): EventStatus => {
    if (!eventData?.data_evento) return "undefined";
    const eventDateTimeStr = `${eventData.data_evento.split("T")[0]}T${
      eventData.horario
    }`;
    let eventStartDateTime;
    try {
      eventStartDateTime = new Date(eventDateTimeStr);
      if (isNaN(eventStartDateTime.getTime())) {
        eventStartDateTime = new Date(eventData.data_evento);
      }
    } catch (e) {
      eventStartDateTime = new Date(eventData.data_evento);
    }
    const now = new Date();
    if (isNaN(eventStartDateTime.getTime())) return "undefined";
    const eventEndDateTime = new Date(
      eventStartDateTime.getTime() + 2 * 60 * 60 * 1000
    );
    if (now > eventEndDateTime) return "past";
    if (now >= eventStartDateTime && now <= eventEndDateTime) return "ongoing";
    return "upcoming";
  };

  if (loading)
    return (
      <Container>
        <p>Carregando informações do evento...</p>
      </Container>
    );
  if (error)
    return (
      <Container>
        <p>Erro ao carregar evento: {error}</p>
      </Container>
    );
  if (!eventData)
    return (
      <Container>
        <p>Evento não encontrado.</p>
      </Container>
    );

  const displayDate = new Date(eventData.data_evento).toLocaleDateString(
    "pt-BR",
    { day: "2-digit", month: "long", year: "numeric" }
  );
  let displayTime = "N/A";
  try {
    displayTime = eventData.horario.includes("T")
      ? new Date(eventData.horario).toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : eventData.horario.substring(0, 5);
  } catch (e) {
    /* Usa N/A */
  }
  const eventStatus = getEventStatus();

  return (
    <Container>
      <Sidebar />
      <div className="main-content">
        <TopBar />
        <ContentContainer>
          <EventHeader status={eventStatus} />
          <EventCoverImage
            src={
              eventData.image_capa || "/placeholder.svg?height=400&width=800"
            }
            alt={eventData.titulo}
          />
          <EventTitle>{eventData.titulo}</EventTitle>
          {eventData.organizador && (
            <EventOrganizer
              name={eventData.organizador.nome_completo}
              avatar={
                eventData.organizador.foto_perfil ||
                "/placeholder.svg?height=50&width=50"
              }
            />
          )}
          <EventDescription>{eventData.descricao}</EventDescription>
          <EventInfo
            date={displayDate}
            time={displayTime}
            location={
              eventData.presencial
                ? eventData.local
                : eventData.link_online || "Online"
            }
            currentParticipants={participants.length}
            maxParticipants={eventData.max_participantes ?? undefined}
            category={eventData.categoria_info?.categoria || "Não categorizado"}
            tags={
              eventData.tags
                ? eventData.tags.split(",").map((tag) => tag.trim())
                : []
            }
            status={eventStatus}
            isJoined={isJoined}
            onJoin={handleJoinEvent}
            isLoadingJoin={loadingInteraction}
          />
          <ParticipantsList
            participants={participants.map((p) => ({
              id: p.user_id,
              name: p.nome_completo,
              avatar: p.foto_perfil || "/placeholder.svg?height=40&width=40",
            }))}
            totalParticipants={participants.length}
          />
          {/*
          <CommentSection
            comments={[]} // Passa um array vazio ou não renderiza
            onAddComment={() => alert("Funcionalidade de adicionar comentário desabilitada.")} // Função mock
            isUserAuthenticated={!!currentUser}
          />
          */}
        </ContentContainer>
      </div>
    </Container>
  );
};

export default EventDetails;
