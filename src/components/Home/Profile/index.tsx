import type React from "react";
import {
  ProfileContainer,
  ProfileImage,
  ProfileName,
  ProfileUsername,
  ProfileSection,
} from "./styles";
import { Link } from "react-router-dom";

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
  newMembers?: Member[]; // Tornando opcional para manter compatibilidade
}

const Profile: React.FC<ProfileProps> = ({ name, username, image }) => {
  return (
    <ProfileContainer>
      {/* Link para a imagem do perfil */}
      <Link to={`/profile`} style={{ textDecoration: "none" }}>
        <ProfileImage src={image} alt={name} />
      </Link>

      {/* Link para o nome do perfil */}
      <Link
        to={`/profile/${username}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <ProfileName>{name}</ProfileName>
      </Link>

      <ProfileUsername>@{username}</ProfileUsername>

      {/* Seções vazias (mantidas conforme o original) */}
      <ProfileSection></ProfileSection>
      <ProfileSection></ProfileSection>
    </ProfileContainer>
  );
};

export default Profile;
