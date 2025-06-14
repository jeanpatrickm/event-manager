import type React from "react";
import type { ReactNode } from "react";
import {
  SectionContainer,
  SectionHeader,
  SectionTitle,
  ViewAllLink,
  SectionContent,
} from "./styles";

interface SectionProps {
  title: string;
  children: ReactNode;
  // Adicione a nova propriedade opcional aqui
  contentClassName?: string;
}

const Section: React.FC<SectionProps> = ({ title, children, contentClassName }) => {
  return (
    <SectionContainer>
      <SectionHeader>
        <SectionTitle>{title}</SectionTitle>
        <ViewAllLink href="#">See all</ViewAllLink>
      </SectionHeader>
      {/* Aplique a className recebida ao SectionContent */}
      <SectionContent className={contentClassName}>{children}</SectionContent>
    </SectionContainer>
  );
};

export default Section;