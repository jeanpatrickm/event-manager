import type React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, MainContent, ContentArea } from "./styles";
import { supabase } from "../../lib/supabase";

import Header from "../../components/Home/Header";
import Banner from "../../components/Home/Banner";
import Section from "../../components/Home/Section";
import EventCard from "../../components/Home/Event-Card";
import Sidebar from "../../components/CreateEvent/SideBar";

interface Event {
  evento_id: string;
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

  // 1. Estado para o valor imediato do input de busca
  const [searchTerm, setSearchTerm] = useState("");
  // 2. Estado para o valor "atrasado" (debounced), que efetivamente dispara a busca
  const [debouncedTerm, setDebouncedTerm] = useState("");

  // 3. Efeito para criar o "debounce" (atraso inteligente)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500); // Espera 500ms após o usuário parar de digitar

    // Limpa o timer anterior se o usuário digitar novamente
    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]); // Roda sempre que o termo de busca imediato muda

  // 4. Efeito principal para buscar os dados, agora dependendo do termo "atrasado"
  useEffect(() => {
    const fetchPublicEvents = async () => {
      try {
        setLoading(true);
        setError(null);

        // Inicia a query base do Supabase
        let query = supabase
          .from("eventos")
          .select(
            "evento_id, titulo, descricao, image_capa, publico, data_evento, horario, max_participantes"
          )
          .eq("publico", true);

        // Se houver um termo de busca, adiciona o filtro na query
        if (debouncedTerm) {
          // .or() busca em múltiplos campos. 'ilike' é case-insensitive e busca por partes do texto ('%').
          query = query.or(
            `titulo.ilike.%${debouncedTerm}%,descricao.ilike.%${debouncedTerm}%`
          );
        }

        // Adiciona a ordenação no final
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
  }, [debouncedTerm]); // IMPORTANTE: A busca só roda quando o termo "atrasado" muda

  return (
    <Container>
      <Sidebar activeItem="Home" />
      <MainContent>
        {/* 5. Passa o estado e a função para o Header */}
        <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <ContentArea>
          <Banner
            title="Find Your Community"
            subtitle="on EventManager"
            backgroundImage="/placeholder.svg?height=300&width=1000"
          />

          <Section title="Eventos Públicos">
            {loading ? (
              <p>Carregando eventos...</p>
            ) : error ? (
              <p>{error}</p>
            ) : publicEvents.length === 0 ? (
              // Mensagem dinâmica se não houver resultados para a busca
              <p>
                {debouncedTerm
                  ? "Nenhum evento encontrado para sua busca."
                  : "Nenhum evento público encontrado."}
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
                    memberCount={event.max_participantes || undefined}
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
