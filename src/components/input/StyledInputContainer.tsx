import styled, {CSSObject} from "styled-components";


export enum InputType {
    DEFAULT = "DEFAULT",
    SEARCH = "SEARCH",
    CHAT = "CHAT",
}

export interface InputContainerProps {
    inputType: InputType;
    short?: boolean;
}


export const StyledInputContainer = styled.div<InputContainerProps>`
    ${(props) => getInputTypeCss(props.inputType, props)}
`;


const getInputTypeCss = (containerType: InputType, props: any) : CSSObject => {
    switch (containerType) {
        case InputType.SEARCH:
            return {
                display: "flex",
                "max-width": `${props.short ? "400px" : "100%"}`,
                width: "100%",
                "align-items": "flex-start",
                "justify-content": "flex-start",
                "flex-direction": "column",
                transition: "0.3s ease-in-out",
                "box-sizing": "border-box",
                background: props.theme.colors.inactiveBackground,
                "border-radius": "30px",
                padding: "16px",
            };
        case InputType.DEFAULT:
            return {
                "border-radius": "8px",
                padding: "8px",
                border: `1px solid ${props.theme.colors.outline}`,
                transition: "0.3s",
                "&.active-div": {
                    border: `1px solid ${props.theme.colors.main}`,
                },
                "&.error": {
                    border: `1px solid ${props.theme.colors.error}`,
                },
                "@media (min-width: 600px)": {
                    width: "337px",

                    "&.active-div": {
                        width: "415px",
                        //transform: translateX(39px); /* Adjust the value based on the width difference */
                    },
                },
            };
        case InputType.CHAT:
            return {
                display: "flex",
                "max-width": `${props.short ? "400px" : "100%"}`,
                width: "100%",
                "align-items": "flex-start",
                "justify-content": "flex-start",
                "flex-direction": "row",
                transition: "0.3s ease-in-out",
                "box-sizing": "border-box",
                background: props.theme.colors.inactiveBackground,
                "border-radius": "30px",
                padding: "16px",
            };
    }
}
