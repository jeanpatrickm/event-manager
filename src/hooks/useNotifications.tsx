import { useEffect, useState, useCallback } from "react";
import { supabase } from "../lib/supabase";
import toast from "react-hot-toast";
import { Notification } from "../components/Notifications"; 

export const useNotifications = (userId: string | undefined) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchInitialNotifications = useCallback(async () => {
    if (!userId) return;
    
    const { data, error } = await supabase
      .from("notificacao")
      .select("*")
      .eq("user_id", userId)
      .order("data_envio", { ascending: false });

    if (error) {
      console.error("Erro ao buscar notificações:", error);
      return;
    }

    if (data) {
      setNotifications(data);
      const unread = data.filter((n) => !n.lida).length;
      setUnreadCount(unread);
    }
  }, [userId]);

  useEffect(() => {
    fetchInitialNotifications();

    if (!userId) return;

    const channel = supabase
      .channel(`notifications:${userId}`)
      .on<Notification>(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notificacao",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          const newNotification = payload.new as Notification;
          setNotifications((prev) => [newNotification, ...prev]);
          setUnreadCount((prev) => prev + 1);
          toast.success(
            (t) => (
              <div onClick={() => toast.dismiss(t.id)}>
                <b>{newNotification.titulo}</b>
                <p>{newNotification.mensagem}</p>
              </div>
            ),
            {
              duration: 6000,
            }
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, fetchInitialNotifications]);

  const markAsRead = async (notificationId: string) => {
    const notification = notifications.find(n => n.notificacao_id === notificationId);
    if (notification && notification.lida) return;

    const { error } = await supabase
      .from("notificacao")
      .update({ lida: true })
      .eq("notificacao_id", notificationId);

    if (error) {
      console.error("Erro ao marcar notificação como lida:", error);
      return;
    }

    setNotifications((prev) =>
      prev.map((n) =>
        n.notificacao_id === notificationId ? { ...n, lida: true } : n
      )
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  const markAllAsRead = async () => {
    if (!userId) return;
    const { error } = await supabase
      .from("notificacao")
      .update({ lida: true })
      .eq("user_id", userId)
      .eq("lida", false);

    if (error) {
      console.error("Erro ao marcar todas as notificações como lidas:", error);
      return;
    }

    setNotifications((prev) => prev.map((n) => ({ ...n, lida: true })));
    setUnreadCount(0);
  };

  // NOVA FUNÇÃO PARA DELETAR UMA NOTIFICAÇÃO
  const deleteNotification = async (notificationId: string) => {
    const notification = notifications.find(n => n.notificacao_id === notificationId);

    const { error } = await supabase
        .from('notificacao')
        .delete()
        .eq('notificacao_id', notificationId);

    if (error) {
        toast.error("Erro ao deletar notificação.");
        console.error("Erro ao deletar notificação:", error);
        return;
    }

    // Remove a notificação do estado local e ajusta a contagem se ela não estiver lida
    setNotifications(prev => prev.filter(n => n.notificacao_id !== notificationId));
    if (notification && !notification.lida) {
        setUnreadCount(prev => Math.max(0, prev - 1));
    }
    toast.success("Notificação removida.");
  };

  return { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification };
};
