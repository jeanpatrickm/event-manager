import styled from "styled-components";

interface ProfileBannerProps {
  bannerUrl?: string;
}

// Altere a interface ActionButtonProps para usar o prefixo $
interface ActionButtonProps {
  $primary?: boolean;
}

export const ProfileHeaderContainer = styled.div`
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  background-color: #2b2d42;
  margin-bottom: 20px;
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
`;

export const ProfileInfo = styled.div`
  padding: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const ProfileAvatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid #2b2d42;
  position: absolute;
  top: -50px;
  left: 20px;
  background-color: #2b2d42;
`;

export const ProfileName = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  margin-top: 50px;
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
  color: #ffffff;
`;

export const StatLabel = styled.span`
  font-size: 14px;
  color: #a8a8b3;
`;

export const ProfileActions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

// Altere a definição do ActionButton para usar o prefixo $
export const ActionButton = styled.button<ActionButtonProps>`
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  ${(props) =>
    props.$primary
      ? `
      background-color: #9c4dcc;
      color: white;
      border: none;
      
      &:hover {
        background-color: #7b2cbf;
      }
    `
      : `
      background-color: transparent;
      color: #9c4dcc;
      border: 1px solid #9c4dcc;
      
      &:hover {
        background-color: rgba(156, 77, 204, 0.1);
      }
    `}
`;
