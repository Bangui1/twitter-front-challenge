import React, {ChangeEvent, useRef, useState} from "react";
import {InputType, StyledInputContainer} from "../input/StyledInputContainer";
import {StyledInputTitle} from "./InputTitle";
import {StyledInputElement} from "./StyledInputElement";

interface InputWithLabelProps {
  type?: "password" | "text";
  title: string;
  placeholder: string;
  required: boolean;
  error?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  id: string;
  name: string;
  value: string;
}

const LabeledInput = ({
  title,
  placeholder,
  required,
  error,
  onChange,
  type = "text",
  id,
  name,
  value,
}: InputWithLabelProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [focus, setFocus] = useState(false);

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <StyledInputContainer
      className={`${error ? "error" : ""}`}
      onClick={handleClick}
      inputType={InputType.DEFAULT}
    >
      <StyledInputTitle
        className={`${focus ? "active-label" : ""} ${error ? "error" : ""}`}
      >
        {title}
      </StyledInputTitle>
      <StyledInputElement
        type={type}
        required={required}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={onChange}
        className={error ? "error" : ""}
        ref={inputRef}
        id={id}
        name={name}
        value={value}
      />
    </StyledInputContainer>
  );
};

export default LabeledInput;
