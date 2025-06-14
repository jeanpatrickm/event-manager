import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  HeaderContainer,
  SearchContainer,
  SearchInput,
  IconsContainer,
  IconButton,
  DropdownMenu,
  DropdownMenuItem,
  NotificationBadge,
} from "./styles";
import { Search, Bell, Settings, LogOut } from "lucide-react";
import { supabase } from "../../../lib/supabase";
import { useNotifications } from "../../../hooks/useNotifications";
import Notifications from "../../Notifications";
import { User } from "@supabase/supabase-js";

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchTerm, onSearchChange }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const settingsRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setCurrentUser(user);
    };
    getSession();
  }, []);

  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification, // Pega a nova função do hook
  } = useNotifications(currentUser?.id);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const handleToggleSettingsDropdown = () => {
    setShowSettingsDropdown((prev) => !prev);
    setShowNotifications(false);
  };

  const handleToggleNotifications = () => {
    setShowNotifications((prev) => !prev);
    setShowSettingsDropdown(false);
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Erro ao fazer logout:", error.message);
      } else {
        setShowSettingsDropdown(false);
        navigate("/login");
      }
    } catch (err) {
      console.error("Erro inesperado ao fazer logout:", err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        settingsRef.current &&
        !settingsRef.current.contains(event.target as Node)
      ) {
        setShowSettingsDropdown(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <HeaderContainer>
      <SearchContainer id="search-container-header">
        <Search size={18} color="#666" />
        <SearchInput
          placeholder="Explore eventos pelo título ou descrição"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </SearchContainer>

      <IconsContainer>
        <div
          style={{ position: "relative" }}
          ref={notificationsRef}
          id="nav-notifications"
        >
          <IconButton
            aria-label="Notificações"
            onClick={handleToggleNotifications}
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <NotificationBadge>{unreadCount}</NotificationBadge>
            )}
          </IconButton>
          {showNotifications && (
            <Notifications
              notifications={notifications}
              onMarkAsRead={markAsRead}
              onMarkAllAsRead={markAllAsRead}
              onDelete={deleteNotification} // Passa a função de deletar como prop
            />
          )}
        </div>

        <div
          style={{ position: "relative" }}
          ref={settingsRef}
          id="nav-config"
        >
          <IconButton
            aria-label="Configurações"
            onClick={handleToggleSettingsDropdown}
            aria-expanded={showSettingsDropdown}
            aria-haspopup="menu"
          >
            <Settings size={20} />
          </IconButton>
          {showSettingsDropdown && (
            <DropdownMenu>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut size={16} style={{ marginRight: "10px" }} />
                Logout
              </DropdownMenuItem>
            </DropdownMenu>
          )}
        </div>
      </IconsContainer>
    </HeaderContainer>
  );
};

export default Header;

