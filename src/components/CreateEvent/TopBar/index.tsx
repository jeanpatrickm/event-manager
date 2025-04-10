import type React from "react";
import { Bell, MessageSquare, Settings } from "lucide-react";
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
          <MessageSquare size={20} />
        </ActionButton>

        <ActionButton>
          <Settings size={20} />
        </ActionButton>

        <UserContainer>
          <UserAvatar src="/images/aaa.jpg?height=40&width=40" alt="User" />
          <UserInfo>
            <UserName>Jay</UserName>
            <UserTag>@jay</UserTag>
          </UserInfo>
        </UserContainer>
      </ActionsContainer>
    </TopBarContainer>
  );
};

export default TopBar;
