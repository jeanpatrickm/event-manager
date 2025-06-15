import type React from "react";
import {
  EventCardContainer,
  EventImage,
  EventContent,
  EventTitle,
  EventDescription,
  EventFooter,
  EventMembers,
} from "./styles";
import { Users } from "lucide-react";

interface EventCardProps {
  id: string; // Adicionada a prop id para a key
  title: string;
  description: string;
  imageUrl?: string;
  isPast?: boolean; // Nova prop para controlar o estilo
  membersCount?: number;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  description,
  imageUrl,
  isPast = false, // Valor padrão é false
  membersCount,
}) => {
  return (
    // Passando a prop $isPast para o container estilizado
    <EventCardContainer $isPast={isPast}>
      {imageUrl && <EventImage src={imageUrl} alt={title} />}
      <EventContent>
        <EventTitle>{title}</EventTitle>
        <EventDescription>
           {description.length > 100 ? `${description.substring(0, 100)}...` : description}
        </EventDescription>
        <EventFooter>
          {isPast ? (
            <span style={{color: "var(--color-danger)"}}>Encerrado</span>
          ) : (
            // Fragmento <>...</> para agrupar os elementos
            <>
              {membersCount !== undefined && (
                <EventMembers>
                    <Users size={14} /> {membersCount} {membersCount === 1 ? 'Membro' : 'Membros'}
                </EventMembers>
              )}
              {<span style={{color: "lightblue"}}>Em Breve</span>}
            </>
          )}
        </EventFooter>
      </EventContent>
    </EventCardContainer>
  );
};

export default EventCard;
