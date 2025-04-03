import type React from "react";
import {
  ProfileContainer,
  ProfileImage,
  ProfileName,
  ProfileUsername,
  ProfileSection,
  ProfileSectionTitle,
  ProfileSectionContent,
  MemberItem,
  MemberImage,
  MemberInfo,
  MemberName,
  MemberTime,
  SeeAllLink,
  SocialSection,
  SocialLink,
} from "./styles";
import { Instagram, Twitter } from "lucide-react";

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

const Profile: React.FC<ProfileProps> = ({
  name,
  username,
  image,
  newMembers,
}) => {
  return (
    <ProfileContainer>
      <ProfileImage src={image} alt={name} />
      <ProfileName>{name}</ProfileName>
      <ProfileUsername>{username}</ProfileUsername>

      <ProfileSection>
        <ProfileSectionTitle>
          New Members
          <SeeAllLink href="#">See all</SeeAllLink>
        </ProfileSectionTitle>

        <ProfileSectionContent>
          {newMembers.map((member) => (
            <MemberItem key={member.id}>
              <MemberImage src={member.image} alt={member.name} />
              <MemberInfo>
                <MemberName>{member.name}</MemberName>
                <MemberTime>{member.timeAgo}</MemberTime>
              </MemberInfo>
            </MemberItem>
          ))}
        </ProfileSectionContent>
      </ProfileSection>

      <ProfileSection>
        <ProfileSectionTitle>Follow me</ProfileSectionTitle>
        <SocialSection>
          <SocialLink href="#">
            <Instagram size={20} />
            @eventdesign
          </SocialLink>
          <SocialLink href="#">
            <Twitter size={20} />
            @eventready
          </SocialLink>
        </SocialSection>
      </ProfileSection>
    </ProfileContainer>
  );
};

export default Profile;
