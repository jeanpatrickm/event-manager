import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #151521;
  color: white;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 24px;
`;

export const LogoContainer = styled.div`
  margin-bottom: 32px;
`;

export const LogoText = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #8950fc;
`;

export const MainContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 48px;
  flex: 1;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const CardHeader = styled.div`
  margin-bottom: 24px;
  text-align: center;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
`;

export const Subtitle = styled.p`
  color: var(--color-grey-text);
  font-size: 14px;
`;

export const Form = styled.form`
  width: 100%;
`;

export const LoginLink = styled.div`
  margin-top: 16px;
  text-align: center;
  font-size: 14px;
  color: var(--color-grey-text);
`;

export const Link = styled.a`
  color: #8950fc;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;
