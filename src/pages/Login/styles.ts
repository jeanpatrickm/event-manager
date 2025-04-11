import styled from "styled-components";

// Container e seções principais
export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #1e1e2e;
  color: #fff;
  font-family: "Inter", sans-serif;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

export const LeftSection = styled.div`
  width: 50%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem;

  @media (max-width: 1024px) {
    padding: 2rem;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Logo = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #a855f7;
  margin-bottom: 3rem;
  align-self: flex-start;
`;

export const GradientCard = styled.div`
  background: linear-gradient(135deg, #a855f7 0%, #6366f1 100%);
  border-radius: 1.5rem;
  padding: 3rem;
  width: 100%;
  text-align: center;
  box-shadow: 0 10px 25px rgba(168, 85, 247, 0.2);
`;

export const CardTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
`;

export const CardText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
`;

export const RightSection = styled.div`
  width: 50%;
  max-width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;

  @media (max-width: 1024px) {
    padding: 2rem;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
  }
`;

export const LoginCard = styled.div`
  background-color: #2a2a3c;
  border-radius: 1.5rem;
  padding: 3rem;
  width: 100%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;

  @media (max-width: 480px) {
    padding: 2rem;
  }
`;

export const LoginHeader = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

export const LoginSubtitle = styled.p`
  color: #94a3b8;
  margin-bottom: 2rem;
`;

// Formulário
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-weight: 500;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const IconWrapper = styled.div`
  position: absolute;
  left: 1rem;
  color: #94a3b8;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  background-color: #1e1e2e;
  border: 1px solid #3f3f5a;
  border-radius: 0.5rem;
  color: #fff;
  font-size: 0.875rem;

  &:focus {
    outline: none;
    border-color: #a855f7;
  }

  &::placeholder {
    color: #64748b;
  }
`;

export const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
`;

export const RememberForgotRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Checkbox = styled.input`
  accent-color: #a855f7;
  width: 1rem;
  height: 1rem;
`;

export const CheckboxLabel = styled.label`
  font-size: 0.875rem;
  color: #94a3b8;
`;

export const ForgotPassword = styled.a`
  font-size: 0.875rem;
  color: #a855f7;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const SubmitButton = styled.button`
  background-color: #a855f7;
  color: #fff;
  font-weight: 600;
  padding: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #9333ea;
  }
`;

// Cadastro e login social
export const SignupText = styled.p`
  font-size: 0.875rem;
  color: #94a3b8;
  text-align: center;
  margin-bottom: 1.5rem;
`;

export const SignupLink = styled.a`
  color: #a855f7;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const SocialLoginSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const SocialDivider = styled.div`
  position: relative;
  width: 100%;
  text-align: center;
  color: #94a3b8;
  font-size: 0.875rem;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 30%;
    height: 1px;
    background-color: #3f3f5a;
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
`;

export const SocialButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
`;

export const SocialButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
  background-color: #1e1e2e;
  border: 1px solid #3f3f5a;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2a2a3c;
  }
`;
