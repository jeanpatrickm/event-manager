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
import { Search, Bell, Settings, LogOut } from "lucide-react";//, MessageCircle
import { supabase } from "../../../lib/supabase";

// 1. Definimos a interface para as novas props que o Header vai receber
interface HeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchTerm, onSearchChange }) => {
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 2. Criamos a função que avisa o componente pai sobre a mudança no input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

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

      <SearchContainer id="search-container-header">
        <Search size={18} color="#666" />
        <SearchInput
          placeholder="Explore eventos pelo título ou descrição"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </SearchContainer>

      <IconsContainer>
        <IconButton aria-label="Notificações" id="nav-notifications">
          <Bell size={20} />
        </IconButton>
        {/* <IconButton aria-label="Mensagens">
          <MessageCircle size={20} />
        </IconButton> */}
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
      </IconsContainer>
    </HeaderContainer>
  );
};

export default Header;
