import styled from "styled-components";

export const SidebarContainer = styled.div`
  width: 200px;
  height: 100vh;
  background-color: #352f5b;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const SidebarTitle = styled.h2`
  color: white;
  font-size: 1.2rem;
  margin-bottom: 20px;
  padding-left: 10px;
`;

interface SidebarItemProps {
  $active?: boolean;
}

export const SidebarItem = styled.div<SidebarItemProps>`
  display: flex;
  align-items: center;
  padding: 12px 10px;
  border-radius: 8px;
  margin-bottom: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
  background-color: ${(props) =>
    props.$active ? "rgba(255, 255, 255, 0.1)" : "transparent"};

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const SidebarIcon = styled.div`
  color: white;
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

export const SidebarText = styled.span`
  color: white;
  font-size: 0.9rem;
`;

export const WaveVisualizer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 10px;
  right: 10px;
  height: 40px;
  background: linear-gradient(90deg, #6e3fdc 0%, #b066f2 100%);
  border-radius: 10px;

  &:before {
    content: "";
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    height: 20px;
    background-image: linear-gradient(
      to right,
      #6e3fdc 0%,
      #6e3fdc 10%,
      transparent 10%,
      transparent 20%,
      #b066f2 20%,
      #b066f2 30%,
      transparent 30%,
      transparent 40%,
      #6e3fdc 40%,
      #6e3fdc 50%,
      transparent 50%,
      transparent 60%,
      #b066f2 60%,
      #b066f2 70%,
      transparent 70%,
      transparent 80%,
      #6e3fdc 80%,
      #6e3fdc 90%,
      transparent 90%,
      transparent 100%
    );
    opacity: 0.7;
    border-radius: 5px;
  }
`;
