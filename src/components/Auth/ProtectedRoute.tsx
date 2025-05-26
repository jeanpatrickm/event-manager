import { User } from "@supabase/supabase-js";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { UserProfile } from "../../types";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const fetchOrCreateUserProfile = useCallback(async (authUserData: User) => {

    try {
      const { data, error } = await supabase
        .from('usuario')
        .select('*')
        .eq('user_id', authUserData.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching user profile from "usuarios" table:', error.message);
        return;
      }

      if (data) {
        console.log('User profile fetched and set:', data);
      } else {
        console.log(`User profile with ID ${authUserData.id} not found in 'usuarios' table. Creating new profile...`);

        const newProfile: UserProfile = {
          user_id: authUserData.id,
          nome_usuario: authUserData.email?.split('@')[0] || `user-${authUserData.id.substring(0, 8)}`, // Default username
          email: authUserData.email || '',
          senha: '',
          primeiro_nome: '',
          sobrenome: '',
          foto_perfil: '',
          biografia: '',
          data_criacao: new Date().toISOString(),
          data_atualizacao: new Date().toISOString(),
        };

        const { data: createdData, error: createError } = await supabase
          .from('usuario')
          .insert([newProfile])
          .select('*')
          .single();

        if (createError) {
          console.error('Error creating new user profile:', createError.message);
          return;
        }

        if (createdData) {
          console.log('New user profile created and set:', createdData);
        } else {
          console.error('Failed to create user profile, no data returned.');
        }
      }
    } catch (err) {
      console.error('An unexpected error occurred while fetching or creating user profile:', err);
    }
  }, []);


  useEffect(() => {
    supabase.auth
      .getUser()
      .then((u) => {
        const { data, error } = u;
        if (error) {
          throw error;
        }
        setUser(data.user);
        fetchOrCreateUserProfile(data.user).catch(e => console.error(e))
      })
      .catch((e) => console.error(e))
      .finally(() => setIsLoading(false));
  }, [fetchOrCreateUserProfile]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
