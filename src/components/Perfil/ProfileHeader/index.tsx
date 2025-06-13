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
  instagramLink?: string | null;
  linkedinLink?: string | null;

  // Props para o dono do perfil
  isOwner: boolean;
  onAvatarChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onAvatarUpload: () => Promise<void>;
  newAvatarSelected: boolean;
  isUploadingAvatar: boolean;
  uploadError?: string | null;
  onEditClick: () => void;
}

const ProfileHeader: FC<ProfileHeaderProps> = ({
  username,
  displayName,
  avatarUrl,
  bannerUrl,
  events,
  instagramLink,
  linkedinLink,
  isOwner,
  onAvatarChange,
  onAvatarUpload,
  newAvatarSelected,
  isUploadingAvatar,
  uploadError,
  onEditClick,
}) => {
  const fileInputId = `avatar-upload-${username}`;

  return (
    <ProfileHeaderContainer>
      <ProfileBanner bannerUrl={bannerUrl} />
      <ProfileInfo>
        <ClickableAvatarWrapper
          // A label só funciona para o dono do perfil
          htmlFor={isOwner ? fileInputId : undefined}
          as={isOwner ? "label" : "div"}
          tabIndex={isOwner ? 0 : -1}
        >
          <ProfileAvatar src={avatarUrl} alt={`${displayName}'s avatar`} />
          {isOwner && (
            <AvatarOverlay>
              <Camera size={24} />
            </AvatarOverlay>
          )}
        </ClickableAvatarWrapper>

        {isOwner && (
          <HiddenFileInput
            id={fileInputId}
            type="file"
            accept="image/png, image/jpeg, image/gif, image/webp"
            onChange={onAvatarChange}
            disabled={isUploadingAvatar}
          />
        )}

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

        {isOwner && (newAvatarSelected || uploadError) && (
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
          {isOwner && (
            <ActionButton type="button" onClick={onEditClick}>
              <Edit size={14} />
              Editar Perfil
            </ActionButton>
          )}

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
