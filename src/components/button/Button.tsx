import React, { MouseEventHandler } from "react";
import {ButtonSize, ButtonType, StyledButton} from "./StyledButton";

interface ButtonProps {
  text: string;
  size: ButtonSize;
  buttonType: ButtonType;
  onClick?: MouseEventHandler;
  disabled?: boolean;
}
const Button = ({ text, size, buttonType, onClick, disabled }: ButtonProps) => {
  return (
    <StyledButton
      size={size}
      buttonType={disabled ? ButtonType.DISABLED : buttonType}
      disabled={buttonType === "DISABLED" || (disabled ? disabled : false)}
      onClick={onClick}
    >
      {text}
    </StyledButton>
  );
};

export default Button;
