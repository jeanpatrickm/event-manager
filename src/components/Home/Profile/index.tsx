import type React from "react";
import {
  ProfileContainer,
  ProfileImage,
  ProfileName,
  ProfileUsername,
  ProfileSection,
} from "./styles";

interface Member {
  id: string;
  name: string;
  image: string;
  timeAgo: string;
}

interface ProfileProps {
  name: string;
  username: string;
  image: string;
  newMembers: Member[];
}

const Profile: React.FC<ProfileProps> = ({ name, username, image }) => {
  return (
    <ProfileContainer>
      <ProfileImage src={image} alt={name} />
      <ProfileName>{name}</ProfileName>
      <ProfileUsername>{username}</ProfileUsername>

      <ProfileSection></ProfileSection>

      <ProfileSection></ProfileSection>
    </ProfileContainer>
  );
};

export default Profile;
