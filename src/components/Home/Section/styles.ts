import styled from "styled-components";

export const SectionContainer = styled.section`
  margin-bottom: 30px;
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

export const SectionTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 600;
  color: white;
  margin: 0;
`;

export const ViewAllLink = styled.a`
  color: #6e3fdc;
  font-size: 0.9rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const SectionContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`;
