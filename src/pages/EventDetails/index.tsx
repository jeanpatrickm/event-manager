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
import ApprovalQueue from "../../components/EventDetails/ApprovalQueue";

interface OrganizerData {
  user_id: string;
  nome_completo: string;
  foto_perfil: string | null;
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
  publico: boolean; // Adicionado para verificação
  link_online: string | null;
  user_id: string;
  cod_categoria: number;
  categoria: string | null;
  tags: string | null;
  organizador?: OrganizerData;
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
  const [loadingDelete, setLoadingDelete] = useState(false);

  // Novos estados para o fluxo de aprovação
  const [isPrivate, setIsPrivate] = useState(false);
  const [userStatus, setUserStatus] = useState<'nao_inscrito' | 'pendente' | 'aprovado' | 'recusado'>('nao_inscrito');
  const [pendingRequests, setPendingRequests] = useState<ParticipantData[]>([]);

  useEffect(() => {
    const getSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);
    };
    getSession();
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user ?? null);
    });
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
      setLoading(true);
      setError(null);
      try {
        const { data: eventResult, error: eventError } = await supabase
          .from("eventos")
          .select(`*, usuario:user_id (user_id, primeiro_nome, sobrenome, foto_perfil, nome_usuario)`)
          .eq("evento_id", eventId)
          .single();

        if (eventError) throw eventError;
        if (!eventResult) throw new Error("Evento não encontrado.");

        const fetchedEventData: DetailedEventData = {
          ...eventResult,
          organizador: eventResult.usuario ? {
            user_id: eventResult.usuario.user_id,
            nome_completo: `${eventResult.usuario.primeiro_nome || ""} ${eventResult.usuario.sobrenome || ""}`.trim() || eventResult.usuario.nome_usuario || "Organizador",
            foto_perfil: eventResult.usuario.foto_perfil,
          } : undefined,
        };
        setEventData(fetchedEventData);
        setIsPrivate(!fetchedEventData.publico);

        const { data: inscriptionsResult, error: inscriptionsError } = await supabase
          .from("inscricao")
          .select(`status, usuario:user_id (user_id, primeiro_nome, sobrenome, foto_perfil, nome_usuario)`)
          .eq("evento_id", eventId);

        if (inscriptionsError) throw inscriptionsError;

        const allInscriptions = inscriptionsResult || [];

        const approvedParticipants: ParticipantData[] = allInscriptions
          .filter(i => i.status === 'aprovado')
          .map(p => ({
            user_id: p.usuario.user_id,
            nome_completo: `${p.usuario.primeiro_nome || ""} ${p.usuario.sobrenome || ""}`.trim() || p.usuario.nome_usuario || "Participante",
            foto_perfil: p.usuario.foto_perfil,
          }));
        setParticipants(approvedParticipants);

        const pending: ParticipantData[] = allInscriptions
          .filter(i => i.status === 'pendente')
          .map(p => ({
            user_id: p.usuario.user_id,
            nome_completo: `${p.usuario.primeiro_nome || ""} ${p.usuario.sobrenome || ""}`.trim() || p.usuario.nome_usuario || "Solicitante",
            foto_perfil: p.usuario.foto_perfil,
          }));
        setPendingRequests(pending);

        if (currentUser) {
          const currentUserInscription = allInscriptions.find(i => i.usuario.user_id === currentUser.id);
          if (currentUserInscription) {
            setUserStatus(currentUserInscription.status as any);
            setIsJoined(currentUserInscription.status === 'aprovado');
          } else {
            setUserStatus('nao_inscrito');
            setIsJoined(false);
          }
        }

        const { data: commentsData, error: commentsError } = await supabase
          .from("comentario")
          .select(`comentario_id, texto, data, user_id, evento_id, foto_id, usuario:user_id (user_id, primeiro_nome, sobrenome, foto_perfil, nome_usuario), galeria_item:foto_id (foto_id, foto_url)`)
          .eq("evento_id", eventId)
          .order("data", { ascending: false });

        if (commentsError) throw commentsError;

        const fetchedComments: CommentDBData[] = (commentsData || []).map(c => ({
          comentario_id: c.comentario_id,
          texto: c.texto,
          data: c.data,
          user_id: c.user_id,
          evento_id: c.evento_id,
          foto_id: c.foto_id,
          autor_nome: `${c.usuario.primeiro_nome || ""} ${c.usuario.sobrenome || ""}`.trim() || c.usuario.nome_usuario || "Usuário",
          autor_avatar: c.usuario.foto_perfil,
          attachedImageUrl: c.galeria_item ? (Array.isArray(c.galeria_item) ? c.galeria_item[0]?.foto_url : c.galeria_item.foto_url) : null,
        }));
        setComments(fetchedComments);

      } catch (err: any) {
        console.error("Erro ao buscar detalhes do evento:", err);
        setError(err.message || "Falha ao carregar dados.");
      } finally {
        setLoading(false);
      }
    };
    fetchEventDetails();
  }, [eventId, currentUser]);

  // Em src/pages/EventDetails/index.tsx

  const handleJoinEvent = async () => {
    if (!currentUser || !eventData) {
      alert("Você precisa estar logado para realizar esta ação.");
      return;
    }
    setLoadingInteraction(true);
    try {
      if (isJoined) {
        // Lógica para SAIR do evento (DELETE) continua a mesma
        const { error: deleteError } = await supabase.from("inscricao").delete().match({ evento_id: eventData.evento_id, user_id: currentUser.id });
        if (deleteError) throw deleteError;
        setIsJoined(false);
        setUserStatus('nao_inscrito');
        setParticipants((prev) => prev.filter((p) => p.user_id !== currentUser.id));
      } else {
        // Lógica para ENTRAR ou SOLICITAR
        if (isPrivate) {
          // CORREÇÃO: Chame a nova função RPC em vez de fazer a lógica no cliente
          const { error } = await supabase.rpc('solicitar_inscricao_evento', {
            p_evento_id: eventData.evento_id
          });

          if (error) throw error;
          
          setUserStatus('pendente');
          alert("Sua solicitação foi enviada ao organizador!");

        } else {
          // Para eventos públicos, a lógica de inscrição direta continua igual
          if (eventData.max_participantes !== null && participants.length >= eventData.max_participantes) {
            alert("Desculpe, as vagas para este evento acabaram.");
            setLoadingInteraction(false);
            return;
          }
          const { error: insertError } = await supabase.from("inscricao").upsert({ 
              evento_id: eventData.evento_id, 
              user_id: currentUser.id, 
              status: 'aprovado' 
          });
          if (insertError) throw insertError;
          setIsJoined(true);
          setUserStatus('aprovado');
          
          const { data: userProfile } = await supabase.from("usuario").select("user_id, primeiro_nome, sobrenome, foto_perfil, nome_usuario").eq("user_id", currentUser.id).single();
          if (userProfile && !participants.some(p => p.user_id === userProfile.user_id)) {
            setParticipants((prev) => [...prev, {
              user_id: userProfile.user_id,
              nome_completo: `${userProfile.primeiro_nome || ""} ${userProfile.sobrenome || ""}`.trim() || userProfile.nome_usuario || "Você",
              foto_perfil: userProfile.foto_perfil,
            }]);
          }
        }
      }
    } catch (err: any) {
      console.error("Erro ao processar inscrição:", err);
      alert(`Erro: ${err.message}`);
    } finally {
      setLoadingInteraction(false);
    }
  };

  const manageRequest = async (applicantId: string, newStatus: 'aprovado' | 'recusado') => {
    if (!eventData) return;
    setLoadingInteraction(true);
    try {
      const { error } = await supabase.rpc('gerenciar_solicitacao_inscricao', {
        p_evento_id: eventData.evento_id,
        p_solicitante_user_id: applicantId,
        p_novo_status: newStatus
      });
      if (error) throw error;
      
      const managedUser = pendingRequests.find(req => req.user_id === applicantId);
      setPendingRequests(prev => prev.filter(req => req.user_id !== applicantId));
      if (newStatus === 'aprovado' && managedUser) {
        setParticipants(prev => [...prev, managedUser]);
      }
      alert(`Solicitação ${newStatus === 'aprovado' ? 'aprovada' : 'recusada'} com sucesso.`);
    } catch (err: any) {
      console.error('Erro ao gerenciar solicitação:', err);
      alert(`Erro: ${err.message}`);
    } finally {
      setLoadingInteraction(false);
    }
  };

  // ... (restante das funções handleAddComment, handleDeleteEvent, handleEditEvent, getEventStatus sem alterações)
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
          `comentario_id, texto, data, user_id, evento_id, foto_id, usuario:user_id (user_id, primeiro_nome, sobrenome, foto_perfil, nome_usuario), galeria_item:foto_id (foto_id, foto_url)`
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

  const handleDeleteEvent = async () => {
    if (!eventData || !currentUser || currentUser.id !== eventData.user_id) {
      alert("Você não tem permissão para excluir este evento.");
      return;
    }
    const isConfirmed = window.confirm(
      "Tem certeza que deseja excluir este evento?\nEsta ação não pode ser desfeita. Se houver participantes, eles serão notificados do cancelamento."
    );
    if (!isConfirmed) {
      return;
    }
    setLoadingDelete(true);
    try {
      // ATUALIZADO: Chamamos nossa nova função RPC em vez de deletar diretamente.
      const { error } = await supabase.rpc('cancelar_evento', {
        p_evento_id: eventData.evento_id
      });

      if (error) {
        throw error;
      }
      
      alert("Evento cancelado com sucesso!");
      navigate("/");

    } catch (err: any) {
      console.error("Erro ao cancelar evento:", err);
      alert(`Falha ao cancelar o evento: ${err.message}`);
    } finally {
      setLoadingDelete(false);
    }
  };

  const handleEditEvent = () => {
    navigate(`/edit-event/${eventId}`);
  };

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
  
  if (loading) return <Container><p>Carregando...</p></Container>;
  if (error) return <Container><p>Erro: {error}</p></Container>;
  if (!eventData) return <Container><p>Evento não encontrado.</p></Container>;

  const displayDate = new Date(eventData.data_evento).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
  let displayTime = "N/A";
  try {
    displayTime = eventData.horario.includes("T") ? new Date(eventData.horario).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) : eventData.horario.substring(0, 5);
  } catch (e) {}
  const eventStatus = getEventStatus();
  const isOwner = currentUser?.id === eventData.user_id;

  return (
    <Container>
      <Sidebar />
      <div className="main-content">
        <TopBar />
        <ContentContainer>
          <EventHeader status={eventStatus} />
          <EventCoverImage src={eventData.image_capa || "/placeholder.svg?height=400&width=800"} alt={eventData.titulo} />
          <EventTitle>{eventData.titulo}</EventTitle>

          {eventData.organizador && (
            <EventOrganizer userId={eventData.organizador.user_id} name={eventData.organizador.nome_completo} avatar={eventData.organizador.foto_perfil || "/placeholder.svg?height=50&width=50"} />
          )}

          <EventDescription>{eventData.descricao}</EventDescription>
          
          {isOwner && pendingRequests.length > 0 && (
            <ApprovalQueue
              requests={pendingRequests}
              onApprove={(applicantId) => manageRequest(applicantId, 'aprovado')}
              onDeny={(applicantId) => manageRequest(applicantId, 'recusado')}
              isLoading={loadingInteraction}
            />
          )}

          <EventInfo
            date={displayDate}
            time={displayTime}
            location={eventData.presencial ? eventData.local : eventData.link_online || "Online"}
            currentParticipants={participants.length}
            maxParticipants={eventData.max_participantes}
            category={eventData.categoria || "Não categorizado"}
            tags={eventData.tags ? eventData.tags.split(",").map((tag) => tag.trim()) : []}
            status={eventStatus}
            isJoined={isJoined}
            onJoin={handleJoinEvent}
            isLoadingJoin={loadingInteraction}
            isOwner={isOwner}
            onDelete={handleDeleteEvent}
            isLoadingDelete={loadingDelete}
            onEdit={handleEditEvent}
            isPrivate={isPrivate}
            userStatus={userStatus}
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
              authorAvatar: c.autor_avatar || "/placeholder.svg?height=40&width=40",
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