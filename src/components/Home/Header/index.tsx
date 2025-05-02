import type React from "react";
import {
  HeaderContainer,
  SearchContainer,
  SearchInput,
  IconsContainer,
  IconButton,
} from "./styles";
import { Search, Bell, MessageCircle, Settings } from "lucide-react";

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <SearchContainer>
        <Search size={18} color="#666" />
        <SearchInput placeholder="Explore" />
      </SearchContainer>

      <IconsContainer>
        <IconButton>
          <Bell size={20} />
        </IconButton>
        <IconButton>
          <MessageCircle size={20} />
        </IconButton>
        <IconButton>
          <Settings size={20} />
        </IconButton>
      </IconsContainer>
    </HeaderContainer>
  );
};

export default Header;
