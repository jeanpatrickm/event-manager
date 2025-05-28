import type React from "react";
import { Bell, MessageCircle, Settings } from "lucide-react";
import {
  TopBarContainer,
  SearchContainer,
  SearchInput,
  SearchIcon,
  ActionsContainer,
  ActionButton,
} from "./styles";

const TopBar: React.FC = () => {
  // Dados do usuário (você pode receber via props ou contexto)

  return (
    <TopBarContainer>
      <SearchContainer>
        <SearchIcon />
        <SearchInput placeholder="Explore" />
      </SearchContainer>

      <ActionsContainer>
        <ActionButton>
          <Bell size={20} />
        </ActionButton>

        <ActionButton>
          <MessageCircle size={20} />
        </ActionButton>

        <ActionButton>
          <Settings size={20} />
        </ActionButton>
      </ActionsContainer>
    </TopBarContainer>
  );
};

export default TopBar;
