import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

// Um componente simples para estilizar a página de carregamento
const CallbackContainer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100%",
  backgroundColor: "#1e1e2e",
  color: "white",
  fontFamily: "Inter, sans-serif",
};

const AuthCallbackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      // Assim que o Supabase confirma a autenticação...
      if (event === "SIGNED_IN" && session) {
        // Encerramos a escuta para não executar múltiplas vezes
        subscription?.unsubscribe();

        const user = session.user;
        const authFlow = sessionStorage.getItem("authFlow");
        sessionStorage.removeItem("authFlow"); // Limpamos o storage

        // Convertemos os timestamps para comparar
        const createdAt = new Date(user.created_at).getTime();
        const lastSignInAt = user.last_sign_in_at
          ? new Date(user.last_sign_in_at).getTime()
          : createdAt;

        // Se o último login ocorreu menos de 10s após a criação, é um novo usuário
        const isNewUser = lastSignInAt - createdAt < 10000;

        // Cenário 1: Tentou LOGAR com uma conta INEXISTENTE
        if (authFlow === "login" && isNewUser) {
          // Desconectamos o usuário recém-criado
          await supabase.auth.signOut();
          // E o redirecionamos de volta para o login com um erro
          navigate("/login?error=user_not_found");
        }
        // Cenário 2: Tentou REGISTRAR uma conta EXISTENTE
        else if (authFlow === "register" && !isNewUser) {
          // Desconectamos o usuário que tentou se registrar novamente
          await supabase.auth.signOut();
          // E o redirecionamos de volta para o registro com um erro
          navigate("/register?error=user_already_exists");
        }
        // Cenário 3: Fluxo correto (Login de conta existente ou Registro de conta nova)
        else {
          navigate("/");
        }
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [navigate]);

  return <div style={CallbackContainer}>Verificando sua conta...</div>;
};

export default AuthCallbackPage;