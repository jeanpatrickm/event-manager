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
} from "./styles";

interface EventInfoProps {
  date: string;
  time: string;
  location: string;
  currentParticipants: number;
  maxParticipants: number | null; // Alterado para aceitar null
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
}

const EventInfo: React.FC<EventInfoProps> = ({
  date,
  time,
  location,
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
}) => {
  const [isHoveringUnsubscribe, setIsHoveringUnsubscribe] = useState(false);

  // 1. Verifica se o evento está cheio. Só é 'true' se maxParticipants for um número.
  const isFull =
    maxParticipants !== null && currentParticipants >= maxParticipants;

  const handleJoinButtonClick = () => {
    if (isLoadingJoin) return;
    
    if (isJoined) {
      if (window.confirm("Tem certeza que deseja cancelar a inscrição?")) {
        onJoin();
      }
    } else {
      if(isFull) {
        alert("Este evento já atingiu o número máximo de participantes.");
        return;
      }
      onJoin();
    }
  };

  let buttonText = "Participar do Evento";
  if (isLoadingJoin) {
    buttonText = "Processando...";
  } else if (isJoined) {
    buttonText = isHoveringUnsubscribe ? "Cancelar Inscrição" : "Inscrito";
  } else if (isFull) {
    buttonText = "Vagas Esgotadas";
  }


  return (
    <InfoSection>
      <InfoGrid>
        <InfoItem>
          <InfoLabel>
            <Calendar size={18} /> Data
          </InfoLabel>
          <InfoValue>{date}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>
            <Clock size={18} /> Horário
          </InfoLabel>
          <InfoValue>{time}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>
            <MapPin size={18} /> Local
          </InfoLabel>
          <InfoValue>{location}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>
            <Users size={18} /> Participantes
          </InfoLabel>
          {/* 2. Passa a propriedade '$isFull' para o componente de estilo */}
          <InfoValue $isFull={isFull}>
            {currentParticipants}
            {maxParticipants ? `/${maxParticipants}` : ""}
          </InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>
            <Tag size={18} /> Categoria
          </InfoLabel>
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
          disabled={status === "past" || isLoadingJoin || (isFull && !isJoined)}
          onMouseEnter={() => {
            if (isJoined && !isLoadingJoin) {
              setIsHoveringUnsubscribe(true);
            }
          }}
          onMouseLeave={() => {
            setIsHoveringUnsubscribe(false);
          }}
        >
          {buttonText}
        </JoinEventButton>

        <ActionButton>
          <Share2 size={20} />
          Compartilhar
        </ActionButton>

        {isOwner && (
          <>
            <ActionButton type="button" onClick={onEdit}>
              <Edit size={18} />
              Editar Evento
            </ActionButton>

            <DeleteEventButton
              onClick={onDelete}
              disabled={isLoadingJoin || isLoadingDelete}
            >
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
