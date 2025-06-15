import styled from "styled-components";

// Adicionada a prop $isPast
export const EventCardContainer = styled.div<{ $isPast?: boolean }>`
  background-color: #2b2d42;
  border-radius: 8px;
  overflow: hidden;
  /* Aplica o filtro e remove a transição se o evento já passou */
  filter: ${(props) =>
    props.$isPast ? "grayscale(80%) brightness(50%)" : "none"};
  transition: ${(props) => (props.$isPast ? "none" : "transform 0.2s")};

  &:hover {
    /* O efeito hover só se aplica a eventos futuros */
    transform: ${(props) => (props.$isPast ? "none" : "translateY(-5px)")};
  }
`;

export const EventImage = styled.img`
  width: 100%;
  height: 140px;
  object-fit: cover;
`;

export const EventContent = styled.div`
  padding: 15px;
`;

export const EventTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: var(--white);
  margin: 0 0 8px 0;
`;

export const EventDescription = styled.p`
  font-size: 14px;
  color: #a8a8b3;
  margin: 0 0 15px 0;
`;

export const EventFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #a8a8b3;
`;

export const EventStatus = styled.span`
  display: flex;
  align-items: center;
`;

export const EventMembers = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
`;
