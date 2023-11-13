import styled from "styled-components";
import {ChangeEvent, useRef, useState} from "react";
import {InputType, StyledInputContainer} from "./StyledInputContainer";
import {StyledInputTitle} from "../labeled-input/InputTitle";
import {StyledInputElement} from "./StyledInputElement";
import {StyledInputLabel} from "./StyledInputLabel";


interface InputElementProps {
    type?: "password" | "text";
    title?: string;
    placeholder: string;
    required: boolean;
    error?: boolean;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    id: string;
    name: string;
    value: string;
    inputType: InputType;
}

const InputElement = ({
    title,
    placeholder,
    required,
    error,
    onChange,
    type = "text",
    id,
    name,
    value,
    inputType,
}: InputElementProps) => {
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
            inputType={inputType}
            onClick={handleClick}
            className={`${error ? "error" : ""}`}
        >
            {title && <StyledInputLabel
                className={`${focus ? "active-label" : ""} ${error ? "error" : ""}`}
            >
                {title}
            </StyledInputLabel>}
            <StyledInputElement
                type={type}
                required={required}
                placeholder={placeholder}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={onChange}
                id={id}
                name={name}
                value={value}
                ref={inputRef}
                className={`${focus ? "active-div" : ""} ${error ? "error" : ""}`}
            />
        </StyledInputContainer>
    );
}

export default InputElement;

