import type React from "react";
import { Container, MainContent, ContentArea, RightSidebar } from "./styles";

import Sidebar from "../../components/Home/Sidebar";
import Header from "../../components/Home/Header";
import Banner from "../../components/Home/Banner";
import Section from "../../components/Home/Section";
import EventCard from "../../components/Home/Event-Card";
import Profile from "../../components/Home/Profile";
const HomePage: React.FC = () => {
  // Sample data
  const featuredEvents = [
    {
      id: "1",
      title: "Virtual Reality",
      description:
        "A community for VR and novices alike, regular and friendly chat.",
      image: "/placeholder.svg?height=300&width=500",
      onlineCount: 5678,
      memberCount: 345678,
    },
    {
      id: "2",
      title: "Game Play",
      description: "Always a new challenge. Great place to make new friends.",
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
  ];

  const newMembers = [
    {
      id: "m1",
      name: "Anne Couture",
      image: "/placeholder.svg?height=100&width=100",
      timeAgo: "5 min ago",
    },
    {
      id: "m2",
      name: "Miriam Soleil",
      image: "/placeholder.svg?height=100&width=100",
      timeAgo: "20 min ago",
    },
    {
      id: "m3",
      name: "Marie Laval",
      image: "/placeholder.svg?height=100&width=100",
      timeAgo: "35 min ago",
    },
    {
      id: "m4",
      name: "Mark Morain",
      image: "/placeholder.svg?height=100&width=100",
      timeAgo: "40 min ago",
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

      <RightSidebar>
        <Profile
          name="Sophie Fortune"
          username="@sophiefortune"
          image="/placeholder.svg?height=200&width=200"
          newMembers={newMembers}
        />
      </RightSidebar>
    </Container>
  );
};

export default HomePage;
