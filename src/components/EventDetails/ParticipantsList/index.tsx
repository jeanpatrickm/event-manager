import type React from "react";
import { Link } from "react-router-dom";
import {
  ParticipantsContainer,
  ParticipantsHeader,
  ParticipantsGrid,
  ParticipantItem,
  ParticipantAvatar,
  ParticipantName,
} from "./styles";

interface Participant {
  id: string;
  name: string;
  avatar: string;
}

interface ParticipantsListProps {
  participants: Participant[];
  totalParticipants: number;
}

const ParticipantsList: React.FC<ParticipantsListProps> = ({
  participants,
  totalParticipants,
}) => {
  return (
    <ParticipantsContainer>
      <ParticipantsHeader>
        <h3>Participantes ({totalParticipants})</h3>
        {totalParticipants > participants.length && <a href="#">Ver todos</a>}
      </ParticipantsHeader>

      <ParticipantsGrid>
        {participants.map((participant) => (
          <Link
            to={`/perfil/${participant.id}`}
            key={participant.id}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ParticipantItem>
              <ParticipantAvatar
                src={participant.avatar}
                alt={participant.name}
              />
              <ParticipantName>{participant.name}</ParticipantName>
            </ParticipantItem>
          </Link>
        ))}
      </ParticipantsGrid>
    </ParticipantsContainer>
  );
};

export default ParticipantsList;
