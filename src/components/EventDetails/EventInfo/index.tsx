"use client";

import type React from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Tag,
  Share2,
  Heart,
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
} from "./styles";

interface EventInfoProps {
  date: string;
  time: string;
  location: string;
  currentParticipants: number;
  maxParticipants: number;
  category: string;
  tags: string[];
  status: "upcoming" | "ongoing" | "past";
  isJoined: boolean;
  isLiked: boolean;
  onJoin: () => void;
  onLike: () => void;
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
  isLiked,
  onJoin,
  onLike,
}) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("pt-BR", options);
  };

  return (
    <InfoSection>
      <InfoGrid>
        <InfoItem>
          <InfoLabel>
            <Calendar size={18} />
            Data
          </InfoLabel>
          <InfoValue>{formatDate(date)}</InfoValue>
        </InfoItem>

        <InfoItem>
          <InfoLabel>
            <Clock size={18} />
            Horário
          </InfoLabel>
          <InfoValue>{time}</InfoValue>
        </InfoItem>

        <InfoItem>
          <InfoLabel>
            <MapPin size={18} />
            Local
          </InfoLabel>
          <InfoValue>{location}</InfoValue>
        </InfoItem>

        <InfoItem>
          <InfoLabel>
            <Users size={18} />
            Participantes
          </InfoLabel>
          <InfoValue>
            {currentParticipants}/{maxParticipants}
          </InfoValue>
        </InfoItem>

        <InfoItem>
          <InfoLabel>
            <Tag size={18} />
            Categoria
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
          onClick={onJoin}
          disabled={status === "past"}
        >
          {isJoined ? "Inscrito" : "Participar do Evento"}
        </JoinEventButton>

        <ActionButton onClick={onLike} $active={isLiked}>
          <Heart size={20} />
          {isLiked ? "Curtido" : "Curtir"}
        </ActionButton>

        <ActionButton>
          <Share2 size={20} />
          Compartilhar
        </ActionButton>
      </ActionButtonsContainer>
    </InfoSection>
  );
};

export default EventInfo;
