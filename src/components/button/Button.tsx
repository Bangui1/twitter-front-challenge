import React, { MouseEventHandler } from "react";
import {ButtonSize, ButtonType, StyledButton} from "./StyledButton";

interface ButtonProps {
  text: string;
  size: ButtonSize;
  buttonType: ButtonType;
  onClick?: MouseEventHandler;
  disabled?: boolean;
  className?: string;
}
const Button = ({ text, size, buttonType, onClick, disabled, className }: ButtonProps) => {
  return (
    <StyledButton
      size={size}
      buttonType={disabled ? ButtonType.DISABLED : buttonType}
      disabled={buttonType === "DISABLED" || (disabled ? disabled : false)}
      onClick={onClick}
      className={className}
    >
      {text}
    </StyledButton>
  );
};

export default Button;
