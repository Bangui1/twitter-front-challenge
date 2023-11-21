import {useOutsideAlerter} from "../../../hooks/useOutsideAlerter";
import {ReactNode, useEffect, useState} from "react";
import {useHttpRequestService} from "../../../service/HttpRequestService";
import {FollowDTO, ProfileDTO, User} from "../../../service";
import {useAppSelector} from "../../../redux/hooks";
import {createPortal} from "react-dom";
import {StyledBlurredBackground} from "../../../components/common/BlurredBackground";
import {StyledTweetModalContainer} from "../../../components/tweet-modal/TweetModalContainer";
import {useNavigate} from "react-router-dom";
import UserDataBox from "../../../components/user-data-box/UserDataBox";
import {StyledContainer} from "../../../components/common/Container";
import Header from "../../home-page/components/header/Header";
import {StyledH5} from "../../../components/common/text";
import {useTranslation} from "react-i18next";

interface CreateChatModalProps {
    onClose: () => void;
    show: boolean;
}

const CreateChatModal = ({ onClose, show }: CreateChatModalProps) => {
    const [users, setUsers] = useState<ProfileDTO[]>([]);
    const ref = useOutsideAlerter({onOutsideClick: onClose})
    const service = useHttpRequestService();
    const user = useAppSelector((state) => state.user.user);
    const navigate = useNavigate();
    const {t} = useTranslation();

    const getUsers = () => {
        service.getFollowing(user.id).then((res) => {
            res.map((follow: FollowDTO) => {
                service.getProfile(follow.followedId).then((res) => {
                    setUsers((users) => [...users, res])
                })
            })
        })
    }

    const handleClick = (id: string) => {
        service.createChat(id).then((res) => {
            navigate(`/messages/${res.id}`)
        })
    }

    useEffect(() => {
        getUsers();
    }, [])


    return createPortal(
        <>
            {show && (
                <StyledBlurredBackground>
                    <StyledTweetModalContainer ref={ref} >
                        <StyledContainer gap={"10px"}>
                            <StyledH5>{t('buttons.new-chat')}</StyledH5>
                        {users.filter((user) => {return user.follows}).map((user) => (
                            <UserDataBox
                                id={user.user.id}
                                name={user.user.name}
                                username={user.user.username}
                                profilePicture={user.user.profilePicture}
                                onClick={() => handleClick(user.user.id)} />
                        ))}
                        </StyledContainer>
                    </StyledTweetModalContainer>
                </StyledBlurredBackground>
            )}
        </>

    , document.body)
}

export default CreateChatModal;
