import type React from "react";
import {
  BannerContainer,
  BannerContent,
  BannerTitle,
  BannerSubtitle,
} from "./styles";

interface BannerProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
}

const Banner: React.FC<BannerProps> = ({
  title,
  subtitle,
  backgroundImage,
}) => {
  return (
    <BannerContainer backgroundImage={backgroundImage}>
      <BannerContent>
        <BannerTitle>{title}</BannerTitle>
        <BannerSubtitle>{subtitle}</BannerSubtitle>
      </BannerContent>
    </BannerContainer>
  );
};

export default Banner;
