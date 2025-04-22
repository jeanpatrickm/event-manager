import type React from "react";
import { ChevronLeft } from "lucide-react";
import { HeaderContainer, BackButton, EventStatusBadge } from "./styles";
import { Link } from "react-router-dom";

interface EventHeaderProps {
  status: "upcoming" | "ongoing" | "past";
}

const EventHeader: React.FC<EventHeaderProps> = ({ status }) => {
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "upcoming":
        return "Em breve";
      case "ongoing":
        return "Em andamento";
      case "past":
        return "Finalizado";
      default:
        return "";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return " var(--logo-text)"; // Roxo
      case "ongoing":
        return "#22c55e"; // Verde
      case "past":
        return "#6c6c7c"; // Cinza
      default:
        return "";
    }
  };

  return (
    <HeaderContainer>
      <BackButton as={Link} to="/">
        <ChevronLeft size={20} />
        Voltar para Eventos
      </BackButton>
      <EventStatusBadge color={getStatusColor(status)}>
        {getStatusLabel(status)}
      </EventStatusBadge>
    </HeaderContainer>
  );
};

export default EventHeader;
