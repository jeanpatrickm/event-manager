import type React from "react";
import {
  CardContainer,
  CardImage,
  CardContent,
  CardTitle,
  CardDescription,
  //CardStats,
  StatItem,
  StatValue,
  CardOverlay,
} from "./styles";
import { Users } from "lucide-react";

interface EventCardProps {
  title: string;
  description: string;
  image: string;
  onlineCount?: number;
  maxParticipants: number | null;
  currentParticipants?: number;
  size?: "normal" | "large";
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  description,
  image,
  //onlineCount,
  maxParticipants,
  currentParticipants = 0,
  size = "normal",
}) => {
  const isFull = maxParticipants !== null && currentParticipants >= maxParticipants;
  return (
    <CardContainer size={size}>
      <CardImage src={image} alt={title} />
      <CardOverlay />
      <CardContent>
        <CardTitle>{title.length > 45 ? `${title.substring(0, 45)}...` : title}</CardTitle>
        <CardDescription>{description.length > 25 ? `${description.substring(0, 25)}...` : description}</CardDescription>

        {/* {(onlineCount || memberCount) && (
          <CardStats>
            {onlineCount !== undefined && (
              <StatItem>
                <StatValue>{onlineCount.toLocaleString()} Online</StatValue>
              </StatItem>
            )} */}

            {maxParticipants !== undefined && (
              <StatItem $isFull={isFull}>
                <Users size={14} />
                <StatValue>
                  {currentParticipants}
                  {maxParticipants ? `/${maxParticipants}` : ''}
                  {' '}
                  {currentParticipants === 1 ? 'Membro' : 'Membros'}
                </StatValue>
              </StatItem>
            )}
          {/* </CardStats>
        )} */}
      </CardContent>
    </CardContainer>
  );
};

export default EventCard;
