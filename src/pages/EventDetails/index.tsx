"use client";

import type React from "react";
import { useState } from "react";
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

interface Comment {
  id: number;
  author: string;
  authorAvatar: string;
  time: string;
  content: string;
}

interface Participant {
  id: number;
  name: string;
  avatar: string;
}

const EventDetails: React.FC = () => {
  // Dados simulados do evento
  const eventData = {
    id: "1",
    title: "Game Play: Torneio de League of Legends",
    description:
      "Junte-se a nós para um torneio emocionante de League of Legends! Jogadores de todos os níveis são bem-vindos. Haverá prêmios para os vencedores e muita diversão para todos. Traga seus amigos e venha mostrar suas habilidades!",
    coverImage: "/placeholder.svg?height=400&width=800",
    date: "2023-12-15",
    time: "18:00",
    location: "Online - Discord",
    maxParticipants: 50,
    currentParticipants: 32,
    category: "Game Play",
    tags: ["League of Legends", "Torneio", "Gaming", "Competitivo", "Online"],
    status: "upcoming" as "upcoming" | "ongoing" | "past",
    organizer: {
      name: "Jay",
      avatar: "/placeholder.svg?height=50&width=50",
    },
  };

  // Dados simulados de participantes
  const [participants] = useState<Participant[]>([
    { id: 1, name: "Alex", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 2, name: "Taylor", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 3, name: "Jordan", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 4, name: "Casey", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 5, name: "Riley", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 6, name: "Morgan", avatar: "/placeholder.svg?height=40&width=40" },
  ]);

  // Dados simulados de comentários
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "Alex",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      time: "2 horas atrás",
      content:
        "Estou muito animado para este evento! Alguém quer formar uma equipe?",
    },
    {
      id: 2,
      author: "Taylor",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      time: "1 hora atrás",
      content:
        "Qual será o formato do torneio? Será eliminação direta ou fase de grupos?",
    },
  ]);

  const [isJoined, setIsJoined] = useState(false);

  const handleJoinEvent = () => {
    setIsJoined(!isJoined);
  };

  const handleAddComment = (content: string) => {
    const newComment: Comment = {
      id: comments.length + 1,
      author: "Você",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      time: "agora",
      content,
    };

    setComments([...comments, newComment]);
  };

  return (
    <Container>
      <Sidebar />
      <div className="main-content">
        <TopBar />
        <ContentContainer>
          <EventHeader status={eventData.status} />

          <EventCoverImage src={eventData.coverImage} alt={eventData.title} />

          <EventTitle>{eventData.title}</EventTitle>

          <EventOrganizer
            name={eventData.organizer.name}
            avatar={eventData.organizer.avatar}
          />

          <EventDescription>{eventData.description}</EventDescription>

          <EventInfo
            date={eventData.date}
            time={eventData.time}
            location={eventData.location}
            currentParticipants={eventData.currentParticipants}
            maxParticipants={eventData.maxParticipants}
            category={eventData.category}
            tags={eventData.tags}
            status={eventData.status}
            isJoined={isJoined}
            onJoin={handleJoinEvent}
          />

          <ParticipantsList
            participants={participants}
            totalParticipants={eventData.currentParticipants}
          />

          <CommentSection comments={comments} onAddComment={handleAddComment} />
        </ContentContainer>
      </div>
    </Container>
  );
};

export default EventDetails;
