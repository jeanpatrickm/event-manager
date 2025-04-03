import type React from "react";
import {
  CardContainer,
  CardImage,
  CardContent,
  CardTitle,
  CardDescription,
  CardStats,
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
  memberCount?: number;
  size?: "normal" | "large";
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  description,
  image,
  onlineCount,
  memberCount,
  size = "normal",
}) => {
  return (
    <CardContainer size={size}>
      <CardImage src={image} alt={title} />
      <CardOverlay />
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>

        {(onlineCount || memberCount) && (
          <CardStats>
            {onlineCount !== undefined && (
              <StatItem>
                <StatValue>{onlineCount.toLocaleString()} Online</StatValue>
              </StatItem>
            )}

            {memberCount !== undefined && (
              <StatItem>
                <Users size={14} />
                <StatValue>{memberCount.toLocaleString()} Members</StatValue>
              </StatItem>
            )}
          </CardStats>
        )}
      </CardContent>
    </CardContainer>
  );
};

export default EventCard;
