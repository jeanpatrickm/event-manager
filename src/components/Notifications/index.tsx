import React from "react";
import {
  DropdownMenu,
  NotificationItem,
  NotificationLink,
  NotificationHeader,
  MarkAllAsRead,
  EmptyState,
  NotificationActions,
  ActionButton,
} from "./styles";

export interface Notification {
  notificacao_id: string;
  user_id: string;
  titulo: string;
  mensagem: string;
  lida: boolean;
  data_envio: string;
  para_funcao: string;
}

interface NotificationsProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDelete: (id: string) => void; // Nova prop para deletar
}

const Notifications: React.FC<NotificationsProps> = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDelete,
}) => {
  const handleActionClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    action: () => void
  ) => {
    e.stopPropagation(); // Impede que o clique se propague para o link
    e.preventDefault(); // Impede a navegação
    action();
  };

  return (
    <DropdownMenu>
      <NotificationHeader>
        <h3>Notificações</h3>
        {notifications.some((n) => !n.lida) && (
          <MarkAllAsRead onClick={onMarkAllAsRead}>
            Marcar todas como lidas
          </MarkAllAsRead>
        )}
      </NotificationHeader>
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <NotificationLink
            to={notification.para_funcao || "#"}
            key={notification.notificacao_id}
            onClick={() => onMarkAsRead(notification.notificacao_id)}
          >
            <NotificationItem $lida={notification.lida}>
              <strong>{notification.titulo}</strong>
              <p>{notification.mensagem}</p>
              <small>
                {new Date(notification.data_envio).toLocaleString("pt-BR")}
              </small>
              <NotificationActions>
                {!notification.lida && (
                  <ActionButton
                    onClick={(e) =>
                      handleActionClick(e, () =>
                        onMarkAsRead(notification.notificacao_id)
                      )
                    }
                  >
                    Marcar como lida
                  </ActionButton>
                )}
                <ActionButton
                  className="delete"
                  onClick={(e) =>
                    handleActionClick(e, () =>
                      onDelete(notification.notificacao_id)
                    )
                  }
                >
                  Excluir
                </ActionButton>
              </NotificationActions>
            </NotificationItem>
          </NotificationLink>
        ))
      ) : (
        <EmptyState>Nenhuma notificação.</EmptyState>
      )}
    </DropdownMenu>
  );
};

export default Notifications;
