import type React from "react";
import {
  ProfileHeaderContainer,
  ProfileBanner,
  ProfileInfo,
  ProfileAvatar,
  ProfileName,
  ProfileUsername,
  ProfileStats,
  StatItem,
  StatValue,
  StatLabel,
  ProfileActions,
  ActionButton,
} from "./styles";
import "lucide-react";
import { Instagram, Linkedin } from "lucide-react";

interface ProfileHeaderProps {
  username: string;
  displayName: string;
  avatarUrl: string;
  bannerUrl?: string;
  events: number;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  username,
  displayName,
  avatarUrl,
  bannerUrl,
  events,
}) => {
  return (
    <ProfileHeaderContainer>
      <ProfileBanner bannerUrl={bannerUrl} />
      <ProfileInfo>
        <ProfileAvatar src={avatarUrl} alt={displayName} />
        <div>
          <ProfileName>{displayName}</ProfileName>
          <ProfileUsername>@{username}</ProfileUsername>
        </div>
        <ProfileStats>
          <StatItem>
            <StatValue>{events}</StatValue>
            <StatLabel>Eventos</StatLabel>
          </StatItem>
        </ProfileStats>
        <ProfileActions>
          <ActionButton $primary>
            <Instagram size={14} />
            Instagram
          </ActionButton>
          <ActionButton $primary>
            <Linkedin size={14} />
            LinkedIn
          </ActionButton>
        </ProfileActions>
      </ProfileInfo>
    </ProfileHeaderContainer>
  );
};

export default ProfileHeader;
