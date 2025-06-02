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
} from "./styles";
import { Search, Bell, MessageCircle, Settings, LogOut } from "lucide-react";
import { supabase } from "../../../lib/supabase";

const Header: React.FC = () => {
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref para o contêiner do ícone e dropdown

  const handleToggleSettingsDropdown = () => {
    setShowSettingsDropdown((prev) => !prev);
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

  // fechar o dropdown se clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowSettingsDropdown(false);
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
    <HeaderContainer>
      <SearchContainer>
        <Search size={18} color="#666" />
        <SearchInput placeholder="Explore" />
      </SearchContainer>

      <IconsContainer>
        <IconButton aria-label="Notificações">
          <Bell size={20} />
        </IconButton>
        <IconButton aria-label="Mensagens">
          <MessageCircle size={20} />
        </IconButton>
        <div style={{ position: "relative" }} ref={dropdownRef}>
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
