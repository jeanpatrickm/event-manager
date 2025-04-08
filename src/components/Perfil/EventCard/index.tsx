import type React from "react";
import { Users } from "lucide-react";
import {
  EventCardContainer,
  EventImage,
  EventContent,
  EventTitle,
  EventDescription,
  EventFooter,
  EventStatus,
  EventMembers,
} from "./styles";

interface EventCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  onlineCount: number;
  membersCount: number;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  description,
  imageUrl,
  onlineCount,
  membersCount,
}) => {
  return (
    <EventCardContainer>
      {imageUrl && <EventImage src={imageUrl} alt={title} />}
      <EventContent>
        <EventTitle>{title}</EventTitle>
        <EventDescription>{description}</EventDescription>
        <EventFooter>
          <EventStatus>{onlineCount} Online</EventStatus>
          <EventMembers>
            <Users size={14} /> {membersCount} Members
          </EventMembers>
        </EventFooter>
      </EventContent>
    </EventCardContainer>
  );
};

export default EventCard;
