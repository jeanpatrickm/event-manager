import styled from "styled-components";

export const ProfileContainer = styled.div`
  width: 219px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #6e3fdc;
  margin-bottom: 15px;
`;

export const ProfileName = styled.h3`
  color: white;
  font-size: 1.1rem;
  margin: 0 0 5px 0;
  text-align: center;
`;

export const ProfileUsername = styled.p`
  color: #999;
  font-size: 0.9rem;
  margin: 0 0 20px 0;
  text-align: center;
`;

export const ProfileSection = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

export const ProfileSectionTitle = styled.h4`
  color: white;
  font-size: 1rem;
  margin: 0 0 15px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SeeAllLink = styled.a`
  color: #6e3fdc;
  font-size: 0.8rem;
  text-decoration: none;
  font-weight: normal;

  &:hover {
    text-decoration: underline;
  }
`;

export const ProfileSectionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const MemberItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px;
  border-radius: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

export const MemberImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

export const MemberInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MemberName = styled.span`
  color: white;
  font-size: 0.9rem;
`;

export const MemberTime = styled.span`
  color: #999;
  font-size: 0.8rem;
`;

export const SocialSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SocialLink = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
  text-decoration: none;
  font-size: 0.9rem;
  padding: 8px;
  border-radius: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
`;
