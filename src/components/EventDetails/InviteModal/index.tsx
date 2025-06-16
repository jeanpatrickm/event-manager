import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../../lib/supabase';
import { User } from '@supabase/supabase-js';
import { X, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  SearchInputContainer,
  SearchInput,
  UserList,
  UserItem,
  UserAvatar,
  UserInfo,
  UserName,
  UserCheckbox,
  ModalFooter,
  PaginationContainer,
  ActionButton,
  CancelButton,
} from './styles';

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendInvites: (selectedUserIds: string[]) => Promise<void>;
  organizerId: string;
  eventId: string;
}

interface Profile {
  user_id: string;
  nome_usuario: string;
  primeiro_nome: string | null;
  foto_perfil: string | null;
}

const InviteModal: React.FC<InviteModalProps> = ({ isOpen, onClose, onSendInvites, organizerId, eventId }) => {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const usersPerPage = 10;

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    
    // 1. Obter usuários já relacionados ao evento para excluí-los da busca
    const { data: inscribedUsersData, error: inscribedError } = await supabase
      .from('inscricao')
      .select('user_id')
      .eq('evento_id', eventId);
    
    if (inscribedError) {
      console.error(inscribedError);
      setLoading(false);
      return;
    }

    const excludedUserIds = (inscribedUsersData || []).map(u => u.user_id);
    excludedUserIds.push(organizerId); // Excluir o próprio organizador

    let query = supabase
      .from('usuario')
      .select('user_id, nome_usuario, primeiro_nome, foto_perfil', { count: 'exact' })
      .not('user_id', 'in', `(${excludedUserIds.join(',')})`)
      .range(page * usersPerPage, (page + 1) * usersPerPage - 1);

    if (searchTerm) {
      query = query.or(`nome_usuario.ilike.%${searchTerm}%,primeiro_nome.ilike.%${searchTerm}%`);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('Erro ao buscar usuários:', error);
    } else {
      setUsers(data || []);
      setTotalUsers(count || 0);
    }
    setLoading(false);
  }, [page, searchTerm, eventId, organizerId]);

  useEffect(() => {
    if (isOpen) {
      fetchUsers();
    }
  }, [isOpen, fetchUsers]);

  const handleSelectUser = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleConfirm = async () => {
    await onSendInvites(selectedUsers);
    setSelectedUsers([]);
    onClose();
  };

  if (!isOpen) return null;

  const totalPages = Math.ceil(totalUsers / usersPerPage);

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Convidar Usuários</ModalTitle>
          <CloseButton onClick={onClose}><X size={24} /></CloseButton>
        </ModalHeader>

        <SearchInputContainer>
          <Search size={20} />
          <SearchInput
            placeholder="Buscar por nome ou usuário..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchInputContainer>

        <UserList>
          {loading ? (
            <p>Carregando...</p>
          ) : (
            users.map((user) => (
              <UserItem key={user.user_id} onClick={() => handleSelectUser(user.user_id)}>
                <UserAvatar src={user.foto_perfil || '/images/default-avatar.png'} />
                <UserInfo>
                  <UserName>{user.primeiro_nome || user.nome_usuario}</UserName>
                  <span>@{user.nome_usuario}</span>
                </UserInfo>
                <UserCheckbox
                  type="checkbox"
                  checked={selectedUsers.includes(user.user_id)}
                  readOnly
                />
              </UserItem>
            ))
          )}
        </UserList>

        <ModalFooter>
          <PaginationContainer>
            <ActionButton onClick={() => setPage(p => p - 1)} disabled={page === 0}>
              <ChevronLeft size={20} />
            </ActionButton>
            <span>Página {page + 1} de {totalPages}</span>
            <ActionButton onClick={() => setPage(p => p + 1)} disabled={page + 1 >= totalPages}>
              <ChevronRight size={20} />
            </ActionButton>
          </PaginationContainer>
          <CancelButton onClick={onClose}>Cancelar</CancelButton>
          <ActionButton onClick={handleConfirm} disabled={selectedUsers.length === 0}>
            Enviar Convites ({selectedUsers.length})
          </ActionButton>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

export default InviteModal;