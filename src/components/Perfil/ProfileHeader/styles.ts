import styled from "styled-components";

interface ProfileBannerProps {
  bannerUrl?: string;
}

interface ActionButtonProps {
  $primary?: boolean;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

// --- Styled Components ---

export const ProfileHeaderContainer = styled.div`
  width: 100%;
  border-radius: 8px;
  background-color: #2b2d42;
  margin-bottom: 20px;
  position: relative;
`;

export const ProfileBanner = styled.div<ProfileBannerProps>`
  width: 100%;
  height: 180px;
  background-image: ${(props) =>
    props.bannerUrl
      ? `url(${props.bannerUrl})`
      : "linear-gradient(90deg, #9c4dcc, #7b2cbf)"};
  background-size: cover;
  background-position: center;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

export const ProfileInfo = styled.div`
  padding: 20px;
  padding-top: 70px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const ClickableAvatarWrapper = styled.label`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid #2b2d42;
  position: absolute;
  top: -50px;
  left: 20px;
  cursor: pointer;
  overflow: hidden;
  background-color: #4a4e69;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  z-index: 10;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 0px 15px rgba(156, 77, 204, 0.5);
  }

  &:hover .avatar-overlay-profileheader {
    opacity: 1;
  }

  &:focus-within {
    outline: 3px solid #9c4dcc;
    outline-offset: 2px;
    box-shadow: 0px 0px 15px rgba(156, 77, 204, 0.5);
  }
`;

// Seu ProfileAvatar (img)
export const ProfileAvatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  display: block;
`;

// Overlay para o ícone da câmera no avatar
export const AvatarOverlay = styled.div.attrs({
  className: "avatar-overlay-profileheader",
})`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.55);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  pointer-events: none;
`;

// Input de arquivo escondido
export const HiddenFileInput = styled.input`
  display: none;
`;

// Seus estilos existentes
export const ProfileName = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: var(--white);
  margin: 0;
`;

export const ProfileUsername = styled.p`
  font-size: 16px;
  color: #a8a8b3;
  margin: 0;
`;

export const ProfileStats = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 10px;
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StatValue = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: var(--white);
`;

export const StatLabel = styled.span`
  font-size: 14px;
  color: #a8a8b3;
`;

export const UploadControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
  align-items: flex-start;
`;

export const SaveAvatarButton = styled.button<ActionButtonProps>`
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #9c4dcc;
  color: white;
  border: none;

  &:hover:not(:disabled) {
    background-color: #7b2cbf;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background-color: #5c5c5c;
  }
`;

export const UploadErrorText = styled.p`
  color: #ff6b6b;
  background-color: rgba(255, 107, 107, 0.1);
  border: 1px solid rgba(255, 107, 107, 0.2);
  padding: 10px 15px;
  border-radius: 6px;
  font-size: 0.9em;
  text-align: left;
  width: 100%;
  box-sizing: border-box;
`;

export const ProfileActions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
  flex-wrap: wrap;
`;

export const ActionButton = styled.button<ActionButtonProps>`
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;

  ${(props) =>
    props.$primary
      ? `
      background-color: #9c4dcc;
      color: white;
      border: none;
     
      &:hover:not(:disabled) {
        background-color: #7b2cbf;
      }
    `
      : `
      background-color: transparent;
      color: #9c4dcc;
      border: 1px solid #9c4dcc;
     
      &:hover:not(:disabled) {
        background-color: rgba(156, 77, 204, 0.1);
      }
    `}
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
