import { Bell, LogOut, Settings } from "lucide-react";//MessageCircle
import {
  TopBarContainer,
  // SearchContainer,
  // SearchInput,
  // SearchIcon,
  ActionsContainer,
  NotificationBadge,
} from "./styles";
import {
  IconButton,
  DropdownMenu,
  DropdownMenuItem,
} from "../../Home/Header/styles";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../lib/supabase";
import Notifications from "../../Notifications";
import { useNotifications } from "../../../hooks/useNotifications";
import { User } from "@supabase/supabase-js";

const TopBar: React.FC = () => {
  // Dados do usuário (você pode receber via props ou contexto)
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const [showNotifications, setShowNotifications] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
  

  const handleToggleSettingsDropdown = () => {
    setShowSettingsDropdown((prev) => !prev);
    setShowNotifications(false);
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Erro ao fazer logout:", error.message);
      } else {
        setShowSettingsDropdown(false);
        console.log("Logout realizado com sucesso!");
        navigate("/login");
      }
    } catch (err) {
      console.error("Erro inesperado ao fazer logout:", err);
    }
  };

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

  const handleToggleNotifications = () => {
    setShowNotifications((prev) => !prev);
    setShowSettingsDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
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

    if (showSettingsDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSettingsDropdown]);

  return (
    <TopBarContainer>
      {/* <SearchContainer>
        <SearchIcon />
        <SearchInput placeholder="Explore" />
      </SearchContainer> */}

      <ActionsContainer>
        {/* <ActionButton>
          <Bell size={20} />
        </ActionButton> */}
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

        {/* <ActionButton>
          <MessageCircle size={20} />
        </ActionButton> */}

        {/* <ActionButton>
          <Settings size={20} />
        </ActionButton> */}
        <div style={{ position: "relative" }} ref={dropdownRef} id="nav-config">
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
      </ActionsContainer>
    </TopBarContainer>
  );
};

export default TopBar;
