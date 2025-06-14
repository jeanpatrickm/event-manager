import { Bell, LogOut, Settings } from "lucide-react";//MessageCircle
import {
  TopBarContainer,
  // SearchContainer,
  // SearchInput,
  // SearchIcon,
  ActionsContainer,
  ActionButton,
} from "./styles";
import {
  IconButton,
  DropdownMenu,
  DropdownMenuItem,
} from "../../Home/Header/styles";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../lib/supabase";

const TopBar: React.FC = () => {
  // Dados do usuário (você pode receber via props ou contexto)
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    <TopBarContainer>
      {/* <SearchContainer>
        <SearchIcon />
        <SearchInput placeholder="Explore" />
      </SearchContainer> */}

      <ActionsContainer>
        <ActionButton>
          <Bell size={20} />
        </ActionButton>

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
