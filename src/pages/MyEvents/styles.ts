// Seu arquivo de estilos para ProfilePage (ex: ./styles.ts) ATUALIZADO
import styled from "styled-components";

export const ProfileContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export const ProfileContent = styled.div`
  width: 100%;
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  margin-top: 20px; // Adicionado para separar um pouco do ProfileHeader ou da TabNav
`;

export const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: var(--white); // Usando sua variável de cor
  margin: 0;
`;

export const ViewAllLink = styled.a`
  font-size: 14px;
  color: #9c4dcc; // Sua cor roxa para links
  cursor: pointer;
  text-decoration: none; // Removido sublinhado padrão

  &:hover {
    text-decoration: underline;
  }
`;

export const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

// --- NOVOS ESTILOS ADICIONADOS ABAIXO ---

export const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px; // Aumentei um pouco o espaçamento
  max-width: 700px; // Ajuste conforme necessário
  margin: 20px auto; // Centralizar o formulário e adicionar margem superior/inferior
  padding: 20px;
  background-color: var(
    --background-dark-2,
    #2a2a3e
  ); // Cor de fundo do seu tema
  border-radius: 8px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-weight: 500;
    font-size: 14px;
    color: var(--white); // Usando sua variável de cor
  }

  small {
    font-size: 0.8em;
    color: var(--user-tag-span, #8c8c9b); // Usando sua variável de cor
  }
`;

const commonInputStyles = `
  padding: 12px 16px;
  border-radius: 6px;
  border: 1px solid var(--color-dark-grey-text, #444); // Adapte à sua variável
  background-color: var(--background-dark-3, #1e1e2d); // Adapte
  color: var(--white);
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: var(--logo-text, #9c4dcc); // Sua cor de destaque
    box-shadow: 0 0 0 2px var(--logo-text-shadow, rgba(156, 77, 204, 0.3)); // Sombra de foco opcional
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background-color: var(--color-dark-grey-text, #555);
  }
`;

export const FormInput = styled.input`
  ${commonInputStyles}
`;

export const FormTextArea = styled.textarea`
  ${commonInputStyles}
  min-height: 120px;
  resize: vertical;
  font-family: inherit; // Para herdar a fonte do restante da aplicação
`;

export const SubmitButton = styled.button`
  padding: 12px 24px;
  background-color: var(--logo-text, #9c4dcc); // Sua cor primária/logo
  color: var(--white);
  border: none;
  border-radius: 6px;
  font-weight: 600; // Um pouco mais de destaque
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  align-self: flex-start; // Para não ocupar largura total se não quiser

  &:hover:not(:disabled) {
    background-color: var(
      --color-azul-roxo,
      #7f3db5
    ); // Um tom mais escuro/diferente para hover
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: var(--color-dark-grey-text, #555);
  }
`;

export const SocialLink = styled.a`
  display: inline-flex; // Para que o ícone e o texto fiquem na mesma linha
  align-items: center;
  gap: 8px;
  color: var(--user-tag-ligth, #b0b0c0); // Cor para os links sociais
  text-decoration: none;
  margin-bottom: 10px; // Espaçamento entre links
  padding: 6px 0; // Pequeno padding vertical

  &:hover {
    color: var(--logo-text, #9c4dcc); // Cor no hover
    svg {
      // Pode adicionar um efeito no ícone no hover também, se desejar
    }
  }

  svg {
    flex-shrink: 0; // Para evitar que o ícone seja espremido
    color: var(--logo-text, #9c4dcc); // Cor do ícone
  }
`;
