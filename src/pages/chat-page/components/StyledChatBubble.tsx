import styled, {CSSObject} from "styled-components";

export enum ChatBubbleType {
    SENT = "SENT",
    RECEIVED = "RECEIVED",
    ERROR = "ERROR",
}

export interface ChatBubbleProps {
    chatBubbleType: ChatBubbleType;
}

export const StyledChatBubble = styled.div<ChatBubbleProps>`
  display: flex;
  flex-direction: column;
  align-self: ${(props) => getChatBubbleStyle(props)["align-self"]};
  padding: 8px;
  max-width: 60%;
  margin-bottom: 8px;
  background-color: ${(props) => getChatBubbleStyle(props)["background-color"]};
  border-radius: ${(props) => getChatBubbleStyle(props)["border-radius"]};
  color: ${(props) => props.theme.colors.white};
`;

const getChatBubbleStyle = (props: any) : CSSObject => {
    switch (props.chatBubbleType) {
        case ChatBubbleType.SENT:
            return {
                "align-self": "flex-end",
                "background-color": props.theme.colors.dark,
                "border-radius": "25px 25px 0px 25px",
            };
        case ChatBubbleType.RECEIVED:
            return {
                "align-self": "flex-start",
                "background-color": props.theme.colors.text,
                "border-radius": "25px 25px 25px 0px",
            };
        case ChatBubbleType.ERROR:
            return {
                "align-self": "flex-end",
                "background-color": props.theme.colors.error,
                "border-radius": "25px 25px 0px 25px",
            };
        default:
            return {
                "align-self": "flex-end",
                "background-color": props.theme.colors.dark,
                "border-radius": "25px 25px 0px 25px",
            };
    }
}
