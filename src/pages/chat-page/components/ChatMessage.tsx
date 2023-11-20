import {MessageDTO} from "../../../service";
import {StyledContainer} from "../../../components/common/Container";
import {ChatBubbleType, StyledChatBubble} from "./StyledChatBubble";
import {useAppSelector} from "../../../redux/hooks";
import {StyledP} from "../../../components/common/text";


interface ChatMessageProps {
    message: MessageDTO;
}

const ChatMessage = (
    {
    message,
    }: ChatMessageProps) => {

    const user = useAppSelector((state) => state.user.user);

    return (
        <StyledContainer
            align-items={message.senderId === user.id ? "flex-end" : "flex-start"}
        >
            <StyledChatBubble chatBubbleType={message.senderId === user.id ? ChatBubbleType.SENT : ChatBubbleType.RECEIVED}>
                <p>{message.content}</p>
            </StyledChatBubble>
            <StyledP
                primary={false}
            >
                {new Date(message.createdAt).toLocaleString("default", {
                month: "short",
                day: "numeric",
                weekday: "short",
                hour: "numeric",
                minute: "numeric",
            })}
            </StyledP>
        </StyledContainer>
    )
}

export default ChatMessage;
