import {useNavigate, useParams} from "react-router-dom";
import {Author, ChatDTO, MessageDTO} from "../../service";
import React, {useEffect, useRef, useState} from "react";
import {useHttpRequestService} from "../../service/HttpRequestService";
import {io} from "socket.io-client";
import {useAppSelector} from "../../redux/hooks";
import {StyledContainer} from "../../components/common/Container";
import {useTranslation} from "react-i18next";
import ProfileInfo from "../profile/ProfileInfo";
import {ChatBubbleType, StyledChatBubble} from "./components/StyledChatBubble";
import InputElement from "../../components/input/InputElement";
import {InputType} from "../../components/input/StyledInputContainer";
import {useFormik} from "formik";
import ChatMessage from "./components/ChatMessage";
import {StyledP} from "../../components/common/text";
import {chatMessageValidate} from "../../util/validateForm";
import {BackArrowIcon, ProfileIcon} from "../../components/icon/Icon";
import {StyledMessageContainer} from "./components/StyledMessageContainer";


interface MessageValues{
    content: string;
}

const ChatPage = () => {
    const [chat, setChat] = useState<ChatDTO | null>(null);
    const [friend, setFriend] = useState<Author | null>(null);
    const messagesRef = useRef<HTMLDivElement>(null)
    const service = useHttpRequestService();
    const id = useParams().id;
    const user = useAppSelector((state) => state.user.user);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const formik = useFormik<MessageValues>({
        initialValues: {
            content: '',
        },
        validationSchema: chatMessageValidate,
        onSubmit: values => {
            sendMessage();
        }
    })


    if (!id) return null;

    const socket = io("http://localhost:8080", {
        extraHeaders: {
            authorization: localStorage.getItem("token") ?? "",
        }
    });


    const sendMessage = () => {
        if(!chat) return;
        const newMessage : MessageDTO = {
            content: formik.values.content,
            chatId: id,
            senderId: user.id,
            createdAt: new Date()
        };
        socket.emit("message", newMessage);
        setChat({...chat, messages: [...chat.messages ?? [], newMessage] });
        formik.resetForm();
    }

    const getChat = () => {
        service.getChatData(id).then((res) => {
             setChat(res);
             setFriend(res.users.find((u: Author) => u.id !== user.id) ?? null);
        });
    }

    useEffect(() => {
        getChat();
    }, []);


    useEffect(() => {
        socket.connect();
        socket.emit("chatroom", {chatroomId: id});
        socket.on(`recieve_message`, (message: MessageDTO) => {
            if(message.senderId !== user.id) {
                setChat(prevChat => ({
                    ...prevChat!,
                    messages: [...prevChat?.messages ?? [], message]
                }));
            }
        });
        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    }, [chat?.messages]);


    return (
        <StyledMessageContainer
            borderRight={"1px solid #ebeef0"}
            flex={2}
            maxWidth={"700px"}
            paddingTop={"12px"}
        >
            <BackArrowIcon
                onClick={() => navigate("/messages")}
                height={"50px"}

            />
            <StyledContainer
                borderBottom={"1px solid #ebeef0"}
                padding={"16px"}
                maxHeight={"150px"}
                onClick={() => { navigate(`/profile/${friend?.id}`) }}
            >
                <ProfileInfo
                    name={friend?.name!}
                    username={friend?.username!}
                    profilePicture={friend?.profilePicture!}
                />
            </StyledContainer>
            <StyledContainer
                padding={"16px"}
                gap={"10px"}
                overflow={"auto"}
                height={"100vh"}
                ref={messagesRef}
            >
                {chat?.messages.map((message: MessageDTO) => {
                    return (
                        <ChatMessage
                            message={message}
                        />
                    );
                })}
            </StyledContainer>
            <InputElement
                placeholder={t("placeholder.send")}
                required
                id={"content"}
                name={"content"}
                value={formik.values.content}
                onChange={formik.handleChange}
                inputType={InputType.CHAT}
                onSubmit={formik.handleSubmit}
            />
            {formik.errors.content && formik.touched.content ? <StyledP primary={false} className={"error-message"}>{t('error.message-size')}</StyledP> : null}
        </StyledMessageContainer>
    )
}

export default ChatPage
