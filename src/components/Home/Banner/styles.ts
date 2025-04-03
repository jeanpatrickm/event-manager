import styled from "styled-components";

interface BannerContainerProps {
  backgroundImage: string;
}

export const BannerContainer = styled.div<BannerContainerProps>`
  width: 100%;
  height: 130px;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  background-image: ${(props) => `url(${props.backgroundImage})`};
  background-size: cover;
  background-position: center;
  margin-bottom: 30px;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      rgba(255, 0, 128, 0.5) 0%,
      rgba(0, 128, 255, 0.5) 100%
    );
  }
`;

export const BannerContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: white;
  text-align: center;
`;

export const BannerTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0 0 5px 0;
`;

export const BannerSubtitle = styled.p`
  font-size: 1.2rem;
  margin: 0;
  opacity: 0.9;
`;
