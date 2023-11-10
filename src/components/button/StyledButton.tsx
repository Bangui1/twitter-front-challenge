import styled, {CSSObject} from "styled-components";
import "@fontsource/manrope";

interface ButtonProps {
  size: ButtonSize;
  buttonType: ButtonType;
}
export enum ButtonType {
  DEFAULT = "DEFAULT",
  FOLLOW = "FOLLOW",
  DELETE = "DELETE",
  OUTLINED = "OUTLINED",
  DISABLED = "DISABLED",
}

export enum ButtonSize {
    SMALL = "SMALL",
    MEDIUM = "MEDIUM",
    LARGE = "LARGE",
}

export const StyledButton = styled.button<ButtonProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${(props) => getButtonSizeCss(props.size).padding};
    gap: 8px;
    margin-bottom: 8px;
    height: 33px;
    left: 16px;
    top: 16px;

    background: ${(props) => getButtonTypeCss(props).background};
    border-radius: 40px;

    /* Button */
    font-family: ${(props) => props.theme.font.default};
    font-style: normal;
    font-weight: 800;
    font-size: 15px;
    line-height: 110%;

    border: ${(props) => getButtonTypeCss(props).border};

    color: ${(props) => getButtonTypeCss(props).color};

    text-align: center;

    cursor: pointer;

    transition: 0.3s;

    &:active {
        transform: scale(0.95);
    }

    &:hover {
      ${(props) => getButtonTypeCss(props)["&:hover"]}
    }
`;

const getButtonSizeCss = (size: ButtonSize) : CSSObject => {
    switch (size) {
      case ButtonSize.SMALL:
          return {
              padding: "8px 16px",
          };
      case ButtonSize.MEDIUM:
          return {
              padding: "8px 80px",
          };
      case ButtonSize.LARGE:
        return {
            padding: "8px 192px",
        };
    }
}

const getButtonTypeCss = (props: any) : CSSObject => {
    switch (props.buttonType) {
        case ButtonType.DEFAULT:
            return {
                background: props.theme.colors.main,
                border: "none",
                color: props.theme.colors.white,
                "&:hover": {
                    background: props.theme.hover.default,
                }
            };
        case ButtonType.FOLLOW:
            return {
                background: props.theme.colors.black,
                border: "none",
                color: props.theme.colors.white,
                "&:hover": {
                    background: props.theme.hover.follow,
                }
            };
        case ButtonType.DELETE:
            return {
                background: props.theme.colors.error,
                border: "none",
                color: props.theme.colors.white,
                "&:hover": {
                    background: props.theme.hover.error,
                }
            };
        case ButtonType.OUTLINED:
            return {
                background: props.theme.colors.white,
                border: `1px solid ${props.theme.colors.outline}`,
                color: props.theme.colors.black,
                "&:hover": {
                    background: props.theme.hover.outlined,
                }
            };
        case ButtonType.DISABLED:
            return {
                background: props.theme.colors.light,
                border: "none",
                color: props.theme.colors.white,
                "&:hover": {
                    background: props.theme.hover.disabled,
                }
            };
        default:
            return {
                background: props.theme.colors.main,
                border: "none",
                color: props.theme.colors.white,
                "&:hover": {
                    background: props.theme.hover.default,
                }
            };
    }
}
export default StyledButton;
