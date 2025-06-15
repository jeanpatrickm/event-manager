import type React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, MainContent, ContentArea } from "./styles";
import { supabase } from "../../lib/supabase";

import Header from "../../components/Home/Header";
import Banner from "../../components/Home/Banner";
import Section from "../../components/Home/Section";
import EventCard from "../../components/Home/Event-Card";
import Sidebar from "../../components/Home/SideBar";
import Tutorial from "../../components/Tutorial";
interface Event {
  evento_id: string;
  titulo: string;
  descricao: string;
  image_capa: string | null;
  publico: boolean;
  data_evento: string;
  horario: string;
  max_participantes: number | null;
  inscricao: { count: number }[];
}

const HomePage: React.FC = () => {
  const [publicEvents, setPublicEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  useEffect(() => {
    const fetchPublicEvents = async () => {
      try {
        setLoading(true);
        setError(null);

        const today = new Date().toISOString();

        let query = supabase
            .from("eventos")
            .select("*, inscricao(count)")
            .eq("publico", true)
            .gte("data_evento", today)
            // CORREÇÃO: Adicionado filtro para contar apenas inscrições aprovadas.
            .eq("inscricao.status", "aprovado");

        if (debouncedTerm) {
          query = query.or(
            `titulo.ilike.%${debouncedTerm}%,descricao.ilike.%${debouncedTerm}%`
          );
        }

        const { data, error: supabaseError } = await query.order(
          "data_evento",
          {
            ascending: true,
          }
        );

        if (supabaseError) throw supabaseError;

        setPublicEvents(data || []);
      } catch (err: any) {
        console.error("Erro ao buscar eventos:", err);
        setError(
          err.message ||
            "Falha ao carregar eventos. Tente novamente mais tarde."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPublicEvents();
  }, [debouncedTerm]);

  return (
    <Container>
      <Tutorial />
      <Sidebar activeItem="Home" />
      <MainContent>
        <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <ContentArea>
          <Banner
            title="Event Manager"
            subtitle="Encontre eventos, faça parte de comunidades e crie os seus no Event Manager"
            backgroundImage="/placeholder.svg?height=300&width=1000"
          />

          <Section
            title="Próximos Eventos Públicos"
            contentClassName="section-content-home"
          >
            {loading ? (
              <p>Carregando eventos...</p>
            ) : error ? (
              <p>{error}</p>
            ) : publicEvents.length === 0 ? (
              <p>
                {debouncedTerm
                  ? "Nenhum evento futuro encontrado para sua busca."
                  : "Nenhum evento público agendado no momento."}
              </p>
            ) : (
              publicEvents.map((event) => (
                <Link
                  key={event.evento_id}
                  to={`/event-details/${event.evento_id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <EventCard
                    title={event.titulo}
                    description={event.descricao}
                    image={
                      event.image_capa ||
                      "/placeholder.svg?height=300&width=500"
                    }
                    currentParticipants={event.inscricao[0]?.count ?? 0}
                    maxParticipants={event.max_participantes}
                  />
                </Link>
              ))
            )}
          </Section>
        </ContentArea>
      </MainContent>
    </Container>
  );
};

export default HomePage;