import type React from "react";
import { Bell, MessageCircle, Settings } from "lucide-react";
import { Link } from "react-router-dom"; // Importe o Link
import {
  TopBarContainer,
  SearchContainer,
  SearchInput,
  SearchIcon,
  ActionsContainer,
  ActionButton,
  UserContainer,
  UserAvatar,
  UserInfo,
  UserName,
  UserTag,
} from "./styles";

const TopBar: React.FC = () => {
  // Dados do usuário (você pode receber via props ou contexto)
  const currentUser = {
    username: "jay",
    name: "Jay",
    avatar: "/images/aaa.jpg?height=40&width=40",
  };

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

        {/* Container do usuário com Link */}
        <Link
          to={`/profile/`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <UserContainer>
            <UserAvatar src={currentUser.avatar} alt={currentUser.name} />
            <UserInfo>
              <UserName>{currentUser.name}</UserName>
              <UserTag>@{currentUser.username}</UserTag>
            </UserInfo>
          </UserContainer>
        </Link>
      </ActionsContainer>
    </TopBarContainer>
  );
};

export default TopBar;
