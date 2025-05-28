import type React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, MainContent, ContentArea } from "./styles";
import { supabase } from "../../lib/supabase"; // Importe o cliente do Supabase

import Header from "../../components/Home/Header";
import Banner from "../../components/Home/Banner";
import Section from "../../components/Home/Section";
import EventCard from "../../components/Home/Event-Card";
import Sidebar from "../../components/CreateEvent/SideBar";

interface Event {
  id: string;
  titulo: string;
  descricao: string;
  image_capa: string | null;
  publico: boolean;
  data_evento: string;
  horario: string;
  max_participantes: number | null;
}

const HomePage: React.FC = () => {
  const [publicEvents, setPublicEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Busca os eventos públicos ao carregar o componente
  useEffect(() => {
    const fetchPublicEvents = async () => {
      try {
        setLoading(true);

        // Consulta ao Supabase para buscar eventos públicos
        const { data, error } = await supabase
          .from("eventos")
          .select("*")
          .eq("publico", true)
          .order("data_evento", { ascending: true }); // Ordena por data

        if (error) throw error;

        setPublicEvents(data || []);
      } catch (err) {
        console.error("Erro ao buscar eventos:", err);
        setError("Falha ao carregar eventos. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchPublicEvents();
  }, []);

  // Dados mockados apenas para a seção "Meus Eventos"
  const myEvents = [
    {
      id: "3",
      title: "3D Art",
      description: "A great place to discuss art.",
      image: "/placeholder.svg?height=300&width=500",
      memberCount: 345678,
    },
    // ... outros eventos mockados
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

          {/* Seção de Eventos Públicos - Agora com dados reais */}
          <Section title="Eventos Públicos">
            {loading ? (
              <p>Carregando eventos...</p>
            ) : error ? (
              <p>{error}</p>
            ) : publicEvents.length === 0 ? (
              <p>Nenhum evento público encontrado.</p>
            ) : (
              publicEvents.map((event) => (
                <Link
                  key={event.id}
                  to="/event-details"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <EventCard
                    title={event.titulo}
                    description={event.descricao}
                    image={
                      event.image_capa ||
                      "/placeholder.svg?height=300&width=500"
                    }
                    memberCount={event.max_participantes || undefined}
                  />
                </Link>
              ))
            )}
          </Section>

          {/* Seção de Meus Eventos (mantida com dados mockados por enquanto) */}
          <Section title="Meus Eventos">
            {myEvents.map((event) => (
              <Link
                key={event.id}
                to="/event-details"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <EventCard
                  title={event.title}
                  description={event.description}
                  image={event.image}
                  memberCount={event.memberCount}
                />
              </Link>
            ))}
          </Section>
        </ContentArea>
      </MainContent>
    </Container>
  );
};

export default HomePage;
