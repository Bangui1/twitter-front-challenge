import Avatar from "../common/avatar/Avatar";
import icon from "../../assets/icon.jpg";
import {useNavigate} from "react-router-dom";
import {StyledP} from "../common/text";
import {Author, Message} from "../../service";
import {StyledChatContainer} from "./StyledChatContainer";
import {StyledChatInfoContainer} from "./StyledChatInfoContainer";
import {StyledContainer} from "../common/Container";
import {io} from "socket.io-client";
import {useState} from "react";

interface ChatInfoBoxProps {
    user: Author | undefined;
    chatroomId?: string;
    lastMessage?: Message;
}


export const ChatInfoBox = ({
    user,
    chatroomId,
    lastMessage
}: ChatInfoBoxProps)  => {
    const navigate = useNavigate();




    return (
        <StyledChatContainer
            onClick={() => navigate(`/messages/${chatroomId}`)}
        >
            <Avatar
                height={"48px"}
                src={user?.profilePicture ?? icon}
                onClick={() => navigate(`/messages/${chatroomId}`)}
                alt={user?.name ?? "Name"}
            />
        <StyledChatInfoContainer>
            <StyledContainer
                flex-direction={"row"}
                gap={"10px"}
            >
                <StyledP primary>{user?.name ?? "Name"}</StyledP>
                <StyledP primary={false}>{"@" + user?.username ?? "@Username"}</StyledP>
                {lastMessage && <StyledP primary={false}>{new Date(lastMessage.createdAt).toLocaleString("default", {
                    month: "short",
                    day: "numeric",
                })}</StyledP>}
            </StyledContainer>
            <StyledP primary={false}>{lastMessage?.content}</StyledP>
        </StyledChatInfoContainer>
        </StyledChatContainer>
    )
}

export default ChatInfoBox;
