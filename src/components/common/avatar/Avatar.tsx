import React from "react";
import { StyledAvatarContainer } from "./AvatarContainer";
import NameImage from "./NameImage";

interface AvatarProps {
  src: string;
  alt: string;
  onClick?: () => void;
  width?: string;
  height?: string;
  className?: string;
}

const Avatar = ({ src, alt, onClick, width, height, className }: AvatarProps) => {
  return (
    <StyledAvatarContainer onClick={onClick} width={width} height={height} className={className}>
      {src !== null ? <img src={src} alt={alt} /> : <NameImage name={alt} />}
    </StyledAvatarContainer>
  );
};
export default Avatar;
