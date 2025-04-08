import type React from "react";
import {
  ProfileContainer,
  ProfileContent,
  EventsGrid,
  SectionTitle,
  SectionHeader,
  ViewAllLink,
} from "./styles";
import ProfileHeader from "../../components/Perfil/ProfileHeader";
import EventCard from "../../components/Perfil/EventCard";
import TabNavigation from "../../components/Perfil/TabNavigation";

const ProfilePage: React.FC = () => {
  // Mock data
  const profileData = {
    username: "Jay",
    displayName: "J a y",
    avatarUrl: "/images/aaa.jpg?height=200&width=200",
    bannerUrl: undefined,
    events: 5,
  };

  const createdEvents = [
    {
      id: "1",
      title: "Game Play",
      description: "Always a new challenge. Great place to make new friends.",
      imageUrl: undefined,
      onlineCount: 18201,
      membersCount: 327453,
    },
    {
      id: "2",
      title: "Virtual Reality",
      description:
        "Great place for VR and movies alike, regular and friendly chat.",
      imageUrl: "/vr-image.jpg",
      onlineCount: 5678,
      membersCount: 245678,
    },
    {
      id: "3",
      title: "NFT",
      description: "An NFT community so that everyone can share their NFTs.",
      imageUrl: undefined,
      onlineCount: 3421,
      membersCount: 887789,
    },
  ];

  const joinedEvents = [
    {
      id: "4",
      title: "3D Art",
      description: "A great place to discuss art.",
      imageUrl: undefined,
      onlineCount: 4532,
      membersCount: 345678,
    },
    {
      id: "5",
      title: "Music",
      description: "Share your favorite music and discover new artists.",
      imageUrl: undefined,
      onlineCount: 7890,
      membersCount: 567890,
    },
  ];

  const tabs = [
    {
      id: "created",
      label: "Eventos Criados",
      content: (
        <>
          <SectionHeader>
            <SectionTitle>Eventos Criados</SectionTitle>
            <ViewAllLink>Ver todos</ViewAllLink>
          </SectionHeader>
          <EventsGrid>
            {createdEvents.map((event) => (
              <EventCard
                key={event.id}
                title={event.title}
                description={event.description}
                imageUrl={event.imageUrl}
                onlineCount={event.onlineCount}
                membersCount={event.membersCount}
              />
            ))}
          </EventsGrid>
        </>
      ),
    },
    {
      id: "joined",
      label: "Eventos Participando",
      content: (
        <>
          <SectionHeader>
            <SectionTitle>Eventos Participando</SectionTitle>
            <ViewAllLink>Ver todos</ViewAllLink>
          </SectionHeader>
          <EventsGrid>
            {joinedEvents.map((event) => (
              <EventCard
                key={event.id}
                title={event.title}
                description={event.description}
                imageUrl={event.imageUrl}
                onlineCount={event.onlineCount}
                membersCount={event.membersCount}
              />
            ))}
          </EventsGrid>
        </>
      ),
    },
    {
      id: "about",
      label: "Sobre",
      content: (
        <div>
          <SectionTitle>Sobre</SectionTitle>
          <p>
            Organizador de eventos com foco em comunidades de jogos e
            tecnologia.
          </p>
          <p>Membro desde Abril 2023</p>
        </div>
      ),
    },
  ];

  return (
    <ProfileContainer>
      <ProfileHeader
        username={profileData.username}
        displayName={profileData.displayName}
        avatarUrl={profileData.avatarUrl}
        bannerUrl={profileData.bannerUrl}
        events={profileData.events}
      />

      <ProfileContent>
        <TabNavigation tabs={tabs} defaultTab="created" />
      </ProfileContent>
    </ProfileContainer>
  );
};

export default ProfilePage;
