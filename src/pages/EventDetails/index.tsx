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
import CommentSection from "../../components/EventDetails/ComentSection";
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

interface CommentDBData {
  comentario_id: string;
  texto: string | null;
  data: string;
  user_id: string;
  evento_id: string;
  foto_id: string | null;
  autor_nome: string;
  autor_avatar: string | null;
  attachedImageUrl?: string | null;
}

type EventStatus = "upcoming" | "ongoing" | "past" | "undefined";

const EventDetails: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [eventData, setEventData] = useState<DetailedEventData | null>(null);
  const [participants, setParticipants] = useState<ParticipantData[]>([]);
  const [comments, setComments] = useState<CommentDBData[]>([]);
  const [isJoined, setIsJoined] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingInteraction, setLoadingInteraction] = useState(false);
  const [loadingComment, setLoadingComment] = useState(false);
  // NOVO: Estado para controlar o carregamento da exclusão
  const [loadingDelete, setLoadingDelete] = useState(false);


  // ... (useEffect para buscar sessão - sem alterações)
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

  // ... (useEffect para buscar detalhes do evento )
  useEffect(() => {
    if (!eventId) {
      setError("ID do evento não fornecido.");
      setLoading(false);
      return;
    }

    const fetchEventDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data: eventResult, error: eventError } = await supabase
          .from("eventos")
          .select(
            `*, usuario:user_id (user_id, primeiro_nome, sobrenome, foto_perfil, nome_usuario), categoria_info:cod_categoria (cod_categoria, categoria)`
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

        const { data: participantsResult, error: participantsError } =
          await supabase
            .from("inscricao")
            .select(
              `user_id, usuario:user_id (user_id, primeiro_nome, sobrenome, foto_perfil, nome_usuario)`
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

        const { data: commentsData, error: commentsError } = await supabase
          .from("comentario")
          .select(
            `
            comentario_id, texto, data, user_id, evento_id, foto_id,
            usuario:user_id (user_id, primeiro_nome, sobrenome, foto_perfil, nome_usuario),
            galeria_item:foto_id (foto_id, foto_url)
          `
          )
          .eq("evento_id", eventId)
          .order("data", { ascending: false });

        if (commentsError) throw commentsError;

        const fetchedComments: CommentDBData[] = (commentsData || []).map(
          (c) => ({
            comentario_id: c.comentario_id,
            texto: c.texto,
            data: c.data,
            user_id: c.user_id,
            evento_id: c.evento_id,
            foto_id: c.foto_id,
            autor_nome:
              `${c.usuario.primeiro_nome || ""} ${
                c.usuario.sobrenome || ""
              }`.trim() ||
              c.usuario.nome_usuario ||
              "Usuário",
            autor_avatar: c.usuario.foto_perfil,
            attachedImageUrl: c.galeria_item
              ? Array.isArray(c.galeria_item)
                ? c.galeria_item[0]?.foto_url
                : c.galeria_item.foto_url
              : null,
          })
        );
        setComments(fetchedComments);
      } catch (err: any) {
        console.error("Erro ao buscar detalhes do evento ou comentários:", err);
        setError(err.message || "Falha ao carregar dados.");
      } finally {
        setLoading(false);
      }
    };
    fetchEventDetails();
  }, [eventId, currentUser]);


  const handleJoinEvent = async () => {
    if (!currentUser) {
      alert("Você precisa estar logado para se inscrever.");
      return;
    }
    if (!eventData) {
      alert("Dados do evento não carregados.");
      return;
    }
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
        if (
          eventData.max_participantes !== null &&
          participants.length >= eventData.max_participantes
        ) {
          alert("Desculpe, as vagas para este evento acabaram.");
          setLoadingInteraction(false);
          return;
        }
        const { error: insertError } = await supabase
          .from("inscricao")
          .insert([
            { evento_id: eventData.evento_id, user_id: currentUser.id },
          ]);
        if (insertError) throw insertError;
        setIsJoined(true);
        const { data: userProfile, error: profileError } = await supabase
          .from("usuario")
          .select(
            "user_id, primeiro_nome, sobrenome, foto_perfil, nome_usuario"
          )
          .eq("user_id", currentUser.id)
          .single();
        if (profileError) {
          console.warn(
            "Não foi possível buscar o perfil:",
            profileError.message
          );
          setParticipants((prev) => [
            ...prev,
            {
              user_id: currentUser.id,
              nome_completo: currentUser.email || "Você",
              foto_perfil: null,
            },
          ]);
        } else if (userProfile) {
          setParticipants((prev) => [
            ...prev,
            {
              user_id: userProfile.user_id,
              nome_completo:
                `${userProfile.primeiro_nome || ""} ${
                  userProfile.sobrenome || ""
                }`.trim() ||
                userProfile.nome_usuario ||
                "Você",
              foto_perfil: userProfile.foto_perfil,
            },
          ]);
        }
      }
    } catch (err: any) {
      console.error("Erro ao processar inscrição:", err);
      alert(`Erro: ${err.message}`);
    } finally {
      setLoadingInteraction(false);
    }
  };

  const handleAddComment = async (
    commentText: string,
    imageFile?: File | null
  ) => {
    if (!currentUser) {
      alert("Você precisa estar logado para comentar.");
      return;
    }
    if (!eventData) {
      alert("Dados do evento não estão carregados.");
      return;
    }
    if (commentText.trim() === "" && !imageFile) {
      alert("Adicione um texto ou uma imagem para o seu comentário.");
      return;
    }

    setLoadingComment(true);
    let newUploadedFotoIdFromGaleria: string | null = null;

    try {
      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const imgFileName = `comment_${
          currentUser.id
        }_${Date.now()}.${fileExt}`;
        const bucketName = "event-images";
        const imgFilePath = `comment_attachments/${imgFileName}`;

        const { error: uploadError } = await supabase.storage
          .from(bucketName)
          .upload(imgFilePath, imageFile);

        if (uploadError) {
          console.error("Erro no upload da imagem do comentário:", uploadError);
          throw new Error(`Falha no upload da imagem: ${uploadError.message}`);
        }

        const { data: urlData } = supabase.storage
          .from(bucketName)
          .getPublicUrl(imgFilePath);
        const imageUrl = urlData.publicUrl;

        const generatedFotoIdForGaleriaTable = crypto.randomUUID();

        const { data: galeriaEntry, error: galeriaError } = await supabase
          .from("galeria")
          .insert({
            foto_id: generatedFotoIdForGaleriaTable,
            evento_id: eventData.evento_id,
            user_id: currentUser.id,
            foto_url: imageUrl,
            legenda:
              commentText.trim().substring(0, 50) || `Anexo de comentário`,
          })
          .select("foto_id")
          .single();

        if (galeriaError) {
          console.error("Erro ao salvar imagem na galeria:", galeriaError);
          throw new Error(
            `Falha ao registrar imagem na galeria: ${galeriaError.message}`
          );
        }
        if (!galeriaEntry || !galeriaEntry.foto_id) {
          throw new Error(
            "Não foi possível obter o ID da foto da galeria após a inserção."
          );
        }

        newUploadedFotoIdFromGaleria = galeriaEntry.foto_id;
      }

      const { data: newCommentData, error: insertError } = await supabase
        .from("comentario")
        .insert({
          evento_id: eventData.evento_id,
          user_id: currentUser.id,
          texto: commentText.trim() || null,
          foto_id: newUploadedFotoIdFromGaleria,
        })
        .select(
          `
          comentario_id, texto, data, user_id, evento_id, foto_id,
          usuario:user_id (user_id, primeiro_nome, sobrenome, foto_perfil, nome_usuario),
          galeria_item:foto_id (foto_id, foto_url)
        `
        )
        .single();

      if (insertError) throw insertError;

      if (newCommentData) {
        const addedComment: CommentDBData = {
          comentario_id: newCommentData.comentario_id,
          texto: newCommentData.texto,
          data: newCommentData.data,
          user_id: newCommentData.user_id,
          evento_id: newCommentData.evento_id,
          foto_id: newCommentData.foto_id,
          autor_nome:
            `${newCommentData.usuario.primeiro_nome || ""} ${
              newCommentData.usuario.sobrenome || ""
            }`.trim() ||
            newCommentData.usuario.nome_usuario ||
            "Usuário",
          autor_avatar: newCommentData.usuario.foto_perfil,
          attachedImageUrl: newCommentData.galeria_item
            ? Array.isArray(newCommentData.galeria_item)
              ? newCommentData.galeria_item[0]?.foto_url
              : newCommentData.galeria_item.foto_url
            : null,
        };
        setComments((prevComments) => [addedComment, ...prevComments]);
      }
    } catch (err: any) {
      console.error("Erro ao adicionar comentário:", err);
      alert(`Falha ao adicionar comentário: ${err.message}`);
    } finally {
      setLoadingComment(false);
    }
  };


  // --- FUNÇÃO PARA DELETAR O EVENTO ---
  const handleDeleteEvent = async () => {
    if (!eventData || !currentUser || currentUser.id !== eventData.user_id) {
      alert("Você não tem permissão para excluir este evento.");
      return;
    }

    const isConfirmed = window.confirm(
      "Tem certeza que deseja excluir este evento?\nEsta ação não pode ser desfeita e removerá todas as inscrições e comentários associados."
    );

    if (!isConfirmed) {
      return;
    }

    setLoadingDelete(true);
    try {
      const { error: deleteError } = await supabase
        .from("eventos")
        .delete()
        .match({ evento_id: eventData.evento_id });

      if (deleteError) {
        throw deleteError;
      }

      alert("Evento excluído com sucesso!");
      navigate("/"); // Redireciona para a página inicial
    } catch (err: any) {
      console.error("Erro ao excluir evento:", err);
      alert(`Falha ao excluir o evento: ${err.message}`);
    } finally {
      setLoadingDelete(false);
    }
  };


  // ... (getEventStatus, retornos de loading, error e !eventData )
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
        <p>Carregando...</p>
      </Container>
    );
  if (error)
    return (
      <Container>
        <p>Erro: {error}</p>
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
  } catch (e) {}
  const eventStatus = getEventStatus();

  // NOVO: Verificação se o usuário logado é o dono do evento
  const isOwner = currentUser?.id === eventData.user_id;

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
              userId={eventData.organizador.user_id}
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
            // --- PASSANDO AS NOVAS PROPS ---
            isOwner={isOwner}
            onDelete={handleDeleteEvent}
            isLoadingDelete={loadingDelete}
          />

          <ParticipantsList
            participants={participants.map((p) => ({
              id: p.user_id,
              name: p.nome_completo,
              avatar: p.foto_perfil || "/placeholder.svg?height=40&width=40",
            }))}
            totalParticipants={participants.length}
          />

          <CommentSection
            comments={comments.map((c) => ({
              id: c.comentario_id,
              authorId: c.user_id,
              author: c.autor_nome,
              authorAvatar:
                c.autor_avatar || "/placeholder.svg?height=40&width=40",
              time: new Date(c.data).toLocaleString("pt-BR"),
              content: c.texto || "",
              attachedImageUrl: c.attachedImageUrl,
            }))}
            onAddComment={handleAddComment}
            isUserAuthenticated={!!currentUser}
            isLoadingComment={loadingComment}
          />
        </ContentContainer>
      </div>
    </Container>
  );
};

export default EventDetails;