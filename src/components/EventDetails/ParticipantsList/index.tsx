import type React from "react";
import {
  ParticipantsContainer,
  ParticipantsHeader,
  ParticipantsGrid,
  ParticipantItem,
  ParticipantAvatar,
  ParticipantName,
} from "./styles";

interface Participant {
  id: number;
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
          <ParticipantItem key={participant.id}>
            <ParticipantAvatar
              src={participant.avatar}
              alt={participant.name}
            />
            <ParticipantName>{participant.name}</ParticipantName>
          </ParticipantItem>
        ))}
      </ParticipantsGrid>
    </ParticipantsContainer>
  );
};

export default ParticipantsList;
