import type React from "react";
import { Container, MainContent, ContentArea, RightSidebar } from "./styles";

import Header from "../../components/Home/Header";
import Banner from "../../components/Home/Banner";
import Section from "../../components/Home/Section";
import EventCard from "../../components/Home/Event-Card";
import Profile from "../../components/Home/Profile";
import Sidebar from "../../components/CreateEvent/SideBar";
const HomePage: React.FC = () => {
  // Sample data
  const featuredEvents = [
    {
      id: "1",
      title: "Virtual Reality",
      description:
        "A community for VR and novices alike, regular and friendly chat.",
      image: "/images/virtual_reality.jpg?height=200&width=200",
      onlineCount: 5678,
      memberCount: 345678,
    },
    {
      id: "2",
      title: "Game Play",
      description: "Always a new challenge. Great place to make new friends.",
      image: "/images/gameplay.jpg?height=200&width=200",
      onlineCount: 18201,
      memberCount: 327453,
    },
    {
      id: "3",
      title: "Game Play",
      description: "Always a new challenge. Great place to make new friends.",
      image: "/placeholder.svg?height=300&width=500",
      onlineCount: 18201,
      memberCount: 327453,
    },
    {
      id: "4",
      title: "Game Play",
      description: "Always a new challenge. Great place to make new friends.",
      image: "/placeholder.svg?height=300&width=500",
      onlineCount: 18201,
      memberCount: 327453,
    },
    {
      id: "5",
      title: "Game Play",
      description: "Always a new challenge. Great place to make new friends.",
      image: "/placeholder.svg?height=300&width=500",
      onlineCount: 18201,
      memberCount: 327453,
    },
    {
      id: "6",
      title: "testetitle",
      description: "aula de teste",
      image: "/placeholder.svg?height=300&width=500",
      onlineCount: 18201,
      memberCount: 327453,
    },
    {
      id: "7",
      title: "testetitle",
      description: "aula de teste",
      image: "/placeholder.svg?height=300&width=500",
      onlineCount: 18201,
      memberCount: 327453,
    },
    {
      id: "8",
      title: "testetitle",
      description: "aula de teste",
      image: "/placeholder.svg?height=300&width=500",
      onlineCount: 18201,
      memberCount: 327453,
    },
  ];

  const popularEvents = [
    {
      id: "3",
      title: "3D Art",
      description: "A great place to discuss art.",
      image: "/placeholder.svg?height=300&width=500",
      memberCount: 345678,
    },
    {
      id: "4",
      title: "NFT",
      description: "An NFT community so that everyone can share their NFTs.",
      image: "/placeholder.svg?height=300&width=500",
      memberCount: 887789,
    },
    {
      id: "5",
      title: "test de forma de test",
      description: "test de forma de test",
      image: "/placeholder.svg?height=300&width=500",
      memberCount: 887789,
    },
    {
      id: "6",
      title: "test de forma de test",
      description: "test de forma de test",
      image: "/placeholder.svg?height=300&width=500",
      memberCount: 887789,
    },
  ];

  const newMembers = [
    {
      id: "m1",
      name: "Anne Couture",
      image: "/placeholder.svg?height=100&width=100",
      timeAgo: "5 min ago",
    },
    {
      id: "m3",
      name: "Marie Laval",
      image: "/placeholder.svg?height=100&width=100",
      timeAgo: "35 min ago",
    },
  ];

  return (
    <Container>
      <Sidebar activeItem="Home" />

      <MainContent>
        <Header />

        <ContentArea>
          <Banner
            title="Find Your Community"
            subtitle="on EventManager"
            backgroundImage="/placeholder.svg?height=300&width=1000"
          />

          <Section title="Featured Events">
            {featuredEvents.map((event) => (
              <EventCard
                key={event.id}
                title={event.title}
                description={event.description}
                image={event.image}
                onlineCount={event.onlineCount}
                memberCount={event.memberCount}
              />
            ))}
          </Section>

          <Section title="Popular Right Now">
            {popularEvents.map((event) => (
              <EventCard
                key={event.id}
                title={event.title}
                description={event.description}
                image={event.image}
                memberCount={event.memberCount}
              />
            ))}
          </Section>
        </ContentArea>
      </MainContent>

      {/* <RightSidebar>
        <Profile
          name="J a y"
          username="@Jay"
          image="/images/aaa.jpg?height=200&width=200"
          newMembers={newMembers}
        />
      </RightSidebar> */}
    </Container>
  );
};

export default HomePage;
