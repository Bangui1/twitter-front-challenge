import React, {useState} from "react";
import Button from "../button/Button";
import {useHttpRequestService} from "../../service/HttpRequestService";
import UserDataBox from "../user-data-box/UserDataBox";
import {useTranslation} from "react-i18next";
import {ButtonSize, ButtonType} from "../button/StyledButton";
import {useAppSelector} from "../../redux/hooks";
import "./FollowUserBox.css";
import {StyledFollowUserBox} from "./StyledFollowUserBox";

interface FollowUserBoxProps {
  profilePicture?: string;
  name?: string;
  username?: string;
  id: string;
}

const FollowUserBox = ({
  profilePicture,
  name,
  username,
  id,
}: FollowUserBoxProps) => {
  const user = useAppSelector((state) => state.user.user);
  const service = useHttpRequestService();
  const { t } = useTranslation();

  const [isFollowing, setIsFollowing] = useState(
      user.following.some((f) => f.id === id)
  );

  const handleFollow = async () => {
    if (isFollowing) {
      await service.unfollowUser(id);
    } else {
      await service.followUser(id);
    }
    setIsFollowing(!isFollowing);
  };

  return (
    <StyledFollowUserBox>
      <UserDataBox
        id={id}
        name={name!}
        profilePicture={profilePicture!}
        username={username!}
      />
      <Button
        text={isFollowing ? t("buttons.unfollow") : t("buttons.follow")}
        buttonType={isFollowing ? ButtonType.DELETE : ButtonType.FOLLOW}
        size={ButtonSize.SMALL}
        onClick={handleFollow}
      />
    </StyledFollowUserBox>
  );
};

export default FollowUserBox;
