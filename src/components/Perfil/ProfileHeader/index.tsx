"use client";

import { Instagram, Linkedin, Camera, Save, Edit } from "lucide-react";
import type { FC, ChangeEvent } from "react";
import {
  ProfileHeaderContainer,
  ProfileBanner,
  ProfileInfo,
  ClickableAvatarWrapper,
  ProfileAvatar,
  AvatarOverlay,
  HiddenFileInput,
  ProfileName,
  ProfileUsername,
  ProfileStats,
  StatItem,
  StatValue,
  StatLabel,
  UploadControlsContainer,
  SaveAvatarButton,
  UploadErrorText,
  ProfileActions,
  ActionButton,
} from "./styles";

interface ProfileHeaderProps {
  username: string;
  displayName: string;
  avatarUrl: string;
  bannerUrl?: string;
  events: number;
  onAvatarChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onAvatarUpload: () => Promise<void>;
  newAvatarSelected: boolean;
  isUploadingAvatar: boolean;
  uploadError?: string | null;
  instagramLink?: string | null;
  linkedinLink?: string | null;

  onEditClick: () => void;
}

const ProfileHeader: FC<ProfileHeaderProps> = ({
  username,
  displayName,
  avatarUrl,
  bannerUrl,
  events,
  onAvatarChange,
  onAvatarUpload,
  newAvatarSelected,
  isUploadingAvatar,
  uploadError,
  instagramLink,
  linkedinLink,

  onEditClick,
}) => {
  const fileInputId = "avatar-upload-profile";

  return (
    <ProfileHeaderContainer>
      <ProfileBanner bannerUrl={bannerUrl} />
      <ProfileInfo>
        <ClickableAvatarWrapper htmlFor={fileInputId} tabIndex={0}>
          <ProfileAvatar src={avatarUrl} alt={`${displayName}'s avatar`} />
          <AvatarOverlay>
            <Camera size={24} />
          </AvatarOverlay>
        </ClickableAvatarWrapper>
        <HiddenFileInput
          id={fileInputId}
          type="file"
          accept="image/png, image/jpeg, image/gif, image/webp"
          onChange={onAvatarChange}
          disabled={isUploadingAvatar}
        />

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

        {(newAvatarSelected || uploadError) && (
          <UploadControlsContainer>
            {newAvatarSelected && (
              <SaveAvatarButton
                $primary
                type="button"
                onClick={onAvatarUpload}
                disabled={isUploadingAvatar}
              >
                <Save size={14} />
                {isUploadingAvatar ? "Salvando..." : "Salvar Nova Foto"}
              </SaveAvatarButton>
            )}
            {uploadError && <UploadErrorText>{uploadError}</UploadErrorText>}
          </UploadControlsContainer>
        )}

        <ProfileActions>
          <ActionButton type="button" onClick={onEditClick}>
            <Edit size={14} />
            Editar Perfil
          </ActionButton>

          {instagramLink && (
            <ActionButton
              as="a"
              href={instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              $primary
            >
              <Instagram size={14} />
              Instagram
            </ActionButton>
          )}

          {linkedinLink && (
            <ActionButton
              as="a"
              href={linkedinLink}
              target="_blank"
              rel="noopener noreferrer"
              $primary
            >
              <Linkedin size={14} />
              LinkedIn
            </ActionButton>
          )}
        </ProfileActions>
      </ProfileInfo>
    </ProfileHeaderContainer>
  );
};

export default ProfileHeader;
