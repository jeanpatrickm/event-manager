"use client";

import type React from "react";
import { useState } from "react";
import { UserCheck, UserX, ChevronLeft, ChevronRight } from "lucide-react";
import {
  QueueContainer,
  QueueHeader,
  HeaderContent,
  NavButtons,
  RequestList,
  RequestItem,
  RequestAvatar,
  RequestInfo,
  RequestName,
  ActionButtons,
  ActionButton,
} from "./styles";

interface Participant {
  user_id: string;
  nome_completo: string;
  foto_perfil: string | null;
}

interface ApprovalQueueProps {
  requests: Participant[];
  onApprove: (userId: string) => void;
  onDeny: (userId: string) => void;
  isLoading: boolean;
}

const ApprovalQueue: React.FC<ApprovalQueueProps> = ({
  requests,
  onApprove,
  onDeny,
  isLoading,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 2;

  const handleNext = () => {
    // Avança para a próxima página de itens
    setCurrentIndex((prevIndex) => prevIndex + itemsPerPage);
  };

  const handlePrevious = () => {
    // Retorna para a página anterior de itens
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - itemsPerPage));
  };

  // Itens a serem exibidos na página atual
  const paginatedRequests = requests.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  // Lógica para desabilitar os botões
  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex + itemsPerPage < requests.length;

  return (
    <QueueContainer>
      <QueueHeader>
        <HeaderContent>
          <h3>Solicitações Pendentes ({requests.length})</h3>
          
          {/* Só mostra a navegação se houver mais itens do que o exibido por página */}
          {requests.length > itemsPerPage && (
            <NavButtons>
              <ActionButton
                onClick={handlePrevious}
                disabled={!canGoBack || isLoading}
                variant="nav"
                aria-label="Anterior"
              >
                <ChevronLeft size={18} />
              </ActionButton>
              <ActionButton
                onClick={handleNext}
                disabled={!canGoForward || isLoading}
                variant="nav"
                aria-label="Próximo"
              >
                <ChevronRight size={18} />
              </ActionButton>
            </NavButtons>
          )}
        </HeaderContent>
      </QueueHeader>
      <RequestList>
        {paginatedRequests.map((req) => (
          <RequestItem key={req.user_id}>
            <RequestAvatar
              src={req.foto_perfil || "/images/default-avatar.png"}
              alt={req.nome_completo}
            />
            <RequestInfo>
              <RequestName>{req.nome_completo}</RequestName>
            </RequestInfo>
            <ActionButtons>
              <ActionButton
                onClick={() => onDeny(req.user_id)}
                disabled={isLoading}
                variant="deny"
              >
                <UserX size={16} /> Recusar
              </ActionButton>
              <ActionButton
                onClick={() => onApprove(req.user_id)}
                disabled={isLoading}
                variant="approve"
              >
                <UserCheck size={16} /> Aprovar
              </ActionButton>
            </ActionButtons>
          </RequestItem>
        ))}
      </RequestList>
    </QueueContainer>
  );
};

export default ApprovalQueue;