import styled from "styled-components";

interface CardContainerProps {
  size?: "normal" | "large";
}

export const CardContainer = styled.div<CardContainerProps>`
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  background-color: #2a293b;
  height: ${(props) => (props.size === "large" ? "180px" : "150px")};
  width: 100%;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const CardOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.3) 50%,
    rgba(0, 0, 0, 0) 100%
  );
`;

export const CardContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  color: white;
`;

export const CardTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 5px 0;
`;

export const CardDescription = styled.p`
  font-size: 0.85rem;
  margin: 0 0 10px 0;
  opacity: 0.8;
`;

export const CardStats = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
`;

export const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const StatValue = styled.span`
  opacity: 0.8;
`;

export const StatLabel = styled.span`
  opacity: 0.6;
`;
