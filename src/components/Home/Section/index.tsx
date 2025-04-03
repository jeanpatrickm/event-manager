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
}

const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <SectionContainer>
      <SectionHeader>
        <SectionTitle>{title}</SectionTitle>
        <ViewAllLink href="#">See all</ViewAllLink>
      </SectionHeader>
      <SectionContent>{children}</SectionContent>
    </SectionContainer>
  );
};

export default Section;
