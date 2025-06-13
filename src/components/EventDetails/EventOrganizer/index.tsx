import type React from "react";
import { Link } from "react-router-dom";
import {
  OrganizerContainer,
  OrganizerAvatar,
  OrganizerInfo,
  OrganizerName,
} from "./styles";

interface EventOrganizerProps {
  userId: string;
  name: string;
  avatar: string;
}

const EventOrganizer: React.FC<EventOrganizerProps> = ({
  userId,
  name,
  avatar,
}) => {
  return (
    <OrganizerContainer>
      <Link to={`/perfil/${userId}`}>
        <OrganizerAvatar src={avatar} alt={`Foto de ${name}`} />
      </Link>
      <OrganizerInfo>
        <OrganizerName>Organizado por {name}</OrganizerName>
      </OrganizerInfo>
    </OrganizerContainer>
  );
};

export default EventOrganizer;
