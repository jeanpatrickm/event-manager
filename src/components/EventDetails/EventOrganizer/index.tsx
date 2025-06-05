import type React from "react";
import {
  OrganizerContainer,
  OrganizerAvatar,
  OrganizerInfo,
  OrganizerName,
} from "./styles";

interface EventOrganizerProps {
  name: string;
  avatar: string;
}

const EventOrganizer: React.FC<EventOrganizerProps> = ({ name, avatar }) => {
  return (
    <OrganizerContainer>
      <OrganizerAvatar src={avatar} alt={`Foto de ${name}`} />{" "}
      <OrganizerInfo>
        <OrganizerName>Organizado por {name}</OrganizerName>
      </OrganizerInfo>
    </OrganizerContainer>
  );
};

export default EventOrganizer;
