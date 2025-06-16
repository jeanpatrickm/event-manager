"use client";

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Tag,
  Share2,
  Trash2,
  Edit,
  Link as LinkIcon, // Importando o ícone de link
} from "lucide-react";
import {
  InfoSection,
  InfoGrid,
  InfoItem,
  InfoLabel,
  InfoValue,
  TagsContainer,
  TagItem,
  ActionButtonsContainer,
  JoinEventButton,
  ActionButton,
  DeleteEventButton,
  InfoLink, // Importando o novo estilo de link
} from "./styles";

interface EventInfoProps {
  date: string;
  time: string;
  location: string;
  isOnline: boolean; // NOVA PROP: para saber se o evento é online
  currentParticipants: number;
  maxParticipants: number | null;
  category: string;
  tags: string[];
  status: "upcoming" | "ongoing" | "past";
  isJoined: boolean;
  onJoin: () => void;
  isLoadingJoin: boolean;
  isOwner: boolean;
  onDelete: () => void;
  isLoadingDelete: boolean;
  onEdit: () => void;
  isPrivate: boolean;
  userStatus: 'nao_inscrito' | 'pendente' | 'aprovado' | 'recusado' | 'convidado';
  onShareClick: () => void;
  onAcceptInvite: () => void;
}

const EventInfo: React.FC<EventInfoProps> = ({
  date,
  time,
  location,
  isOnline, // Usando a nova prop
  currentParticipants,
  maxParticipants,
  category,
  tags,
  status,
  isJoined,
  onJoin,
  isLoadingJoin,
  isOwner,
  onDelete,
  isLoadingDelete,
  onEdit,
  isPrivate,
  userStatus,
  onShareClick,
  onAcceptInvite,
}) => {
  const [isHoveringUnsubscribe, setIsHoveringUnsubscribe] = useState(false);

  const isFull = maxParticipants !== null && currentParticipants >= maxParticipants;

  const handleJoinButtonClick = () => {
    if (isLoadingJoin) return;
    
    if (isJoined) {
      if (window.confirm("Tem certeza que deseja cancelar a inscrição?")) {
        onJoin();
      }
    } else {
      if (userStatus === 'convidado') {
        onAcceptInvite();
        return;
      }
      
      if(isFull) {
        alert("Este evento já atingiu o número máximo de participantes.");
        return;
      }
      onJoin();
    }
  };

  let buttonText = "Participar do Evento";
  let buttonDisabled = status === "past" || isLoadingJoin;

  if (isJoined) {
    buttonText = isHoveringUnsubscribe ? "Cancelar Inscrição" : "Inscrito";
  } else {
    switch (userStatus) {
      case 'convidado':
        buttonText = "Aceitar Convite";
        break;
      case 'nao_inscrito':
        buttonText = isPrivate ? "Solicitar Inscrição" : "Participar do Evento";
        break;
      case 'pendente':
        buttonText = "Solicitação Enviada";
        buttonDisabled = true;
        break;
      case 'recusado':
        buttonText = "Solicitação Recusada";
        buttonDisabled = true;
        break;
    }
  }

  if (isFull && !isJoined && userStatus !== 'convidado') {
    buttonDisabled = true;
  }

  return (
    <InfoSection>
      <InfoGrid>
        <InfoItem>
          <InfoLabel><Calendar size={18} /> Data</InfoLabel>
          <InfoValue>{date}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel><Clock size={18} /> Horário</InfoLabel>
          <InfoValue>{time}</InfoValue>
        </InfoItem>
        
        {/* LÓGICA ATUALIZADA PARA O LOCAL */}
        <InfoItem>
            <InfoLabel>
                {isOnline ? <LinkIcon size={18} /> : <MapPin size={18} />}
                {isOnline ? "Link" : "Local"}
            </InfoLabel>
            {isOnline && location.startsWith('http') ? (
                <InfoLink href={location} target="_blank" rel="noopener noreferrer">
                    Acessar evento online
                </InfoLink>
            ) : (
                <InfoValue>{location}</InfoValue>
            )}
        </InfoItem>
        
        <InfoItem>
          <InfoLabel><Users size={18} /> Participantes</InfoLabel>
          <InfoValue $isFull={isFull}>
            {currentParticipants}
            {maxParticipants ? `/${maxParticipants}` : ""}
          </InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel><Tag size={18} /> Categoria</InfoLabel>
          <InfoValue>{category}</InfoValue>
        </InfoItem>
      </InfoGrid>

      <TagsContainer>
        {tags.map((tag, index) => (
          <TagItem key={index}>{tag}</TagItem>
        ))}
      </TagsContainer>

      <ActionButtonsContainer>
        <JoinEventButton
          $joined={isJoined}
          $hoveringUnsubscribe={isJoined && isHoveringUnsubscribe}
          onClick={handleJoinButtonClick}
          disabled={buttonDisabled}
          onMouseEnter={() => { if (isJoined && !isLoadingJoin) { setIsHoveringUnsubscribe(true); }}}
          onMouseLeave={() => { setIsHoveringUnsubscribe(false); }}
        >
          {buttonText}
        </JoinEventButton>

        {(!isPrivate || isOwner) && (
          <ActionButton onClick={onShareClick}>
            <Share2 size={20} />
            Compartilhar
          </ActionButton>
        )}

        {isOwner && (
          <>
            <ActionButton type="button" onClick={onEdit}>
              <Edit size={18} />
              Editar Evento
            </ActionButton>

            <DeleteEventButton onClick={onDelete} disabled={isLoadingJoin || isLoadingDelete}>
              <Trash2 size={18} />
              {isLoadingDelete ? "Excluindo..." : "Excluir Evento"}
            </DeleteEventButton>
          </>
        )}
      </ActionButtonsContainer>
    </InfoSection>
  );
};

export default EventInfo;
