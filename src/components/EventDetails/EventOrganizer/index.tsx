import type React from "react";
import {
  OrganizerContainer,
  OrganizerAvatar,
  OrganizerInfo,
  OrganizerName,
  OrganizerTitle,
} from "./styles";

interface EventOrganizerProps {
  name: string;
  avatar: string;
  title: string;
}

const EventOrganizer: React.FC<EventOrganizerProps> = ({
  name,
  avatar,
  title,
}) => {
  return (
    <OrganizerContainer>
      <OrganizerAvatar src={"/images/aaa.jpg"} alt={name} />
      <OrganizerInfo>
        <OrganizerName>Organizado por {name}</OrganizerName>
        <OrganizerTitle>{title}</OrganizerTitle>
      </OrganizerInfo>
    </OrganizerContainer>
  );
};

export default EventOrganizer;
