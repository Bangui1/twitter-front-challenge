import {StyledContentContainer} from "../home-page/components/contentContainer/StyledContentContainer";
import {useHttpRequestService} from "../../service/HttpRequestService";
import React, {useEffect, useState} from "react";
import {Chatroom, Message} from "../../service";
import ChatInfoBox from "../../components/chat-info-box/ChatInfoBox";
import {useAppSelector} from "../../redux/hooks";
import {StyledContainer} from "../../components/common/Container";
import {StyledH5} from "../../components/common/text";
import {useTranslation} from "react-i18next";
import {io} from "socket.io-client";
import CreateChatButton from "./components/CreateChatButton";


const MessagesPage = () => {
    const [chatrooms, setChatrooms] = useState<Chatroom[]>([]);
    const service = useHttpRequestService();
    const {t} = useTranslation();
    const user = useAppSelector((state) => state.user.user);

    const handleNewMessage = (message: Message) => {
        setChatrooms((prevChatrooms) => {
            const updatedChatrooms = prevChatrooms.map((chatroom) => {
                if (chatroom.id === message.chatroomId) {
                    return {
                        ...chatroom,
                        lastMessage: message,
                    };
                }
                return chatroom;
            });
            return updatedChatrooms;
        });
    };


    const getChatrooms = () => {
        service.getChatrooms().then((res) => {
            setChatrooms(res);
        });
    }

    const socket = io("http://localhost:8080", {
        extraHeaders: {
            authorization: localStorage.getItem("token") ?? "",
        }
    });




    useEffect(() => {
        socket.connect();
        socket.emit("chatrooms")
        socket.on("recieve_message", (message: Message) => {
            console.log(message);
            handleNewMessage(message);
        });
        return () => {
            socket.disconnect();
        }
    }, []);

    useEffect(() => {
        getChatrooms();
    }, []);


    return (
        <StyledContainer
            borderRight={"1px solid #ebeef0"}
            flex={2}
            maxWidth={"700px"}
        >
            <StyledContainer
                borderBottom={"1px solid #ebeef0"}
                maxHeight={"60px"}
                padding={"16px"}
                flex-direction={"row"}
                justifyContent={"space-between"}
            >
                <StyledH5>{t("header.messages")}</StyledH5>
                <CreateChatButton />
            </StyledContainer>
            <StyledContainer
                padding={"16px"}
                gap={"10px"}
            >
            {chatrooms.map((chatroom: Chatroom) => (
                <ChatInfoBox
                    user={chatroom.users.find((friend) => user.id !== friend.id)}
                    chatroomId={chatroom.id}
                    lastMessage={chatroom.lastMessage}
                    key={chatroom.id}
                />
            ))}
            </StyledContainer>
        </StyledContainer>
    )
};


export default MessagesPage;
