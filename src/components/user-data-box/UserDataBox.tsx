import React from "react";
import Avatar from "../common/avatar/Avatar";
import icon from "../../assets/icon.jpg";
import { useNavigate } from "react-router-dom";
import "./UserDataBox.css";
import {StyledUserContainer} from "./StyledUserContainer";
import {StyledUserInfoContainer} from "./StyledUserInfoContainer";
import {StyledP} from "../common/text";

interface UserDataBoxProps {
  name?: string;
  username?: string;
  profilePicture?: string;
  id: string;
  onClick?: () => void;
}
export const UserDataBox = ({
  name,
  username,
  profilePicture,
  id,
  onClick,
}: UserDataBoxProps) => {
  const navigate = useNavigate();

  return (
    <StyledUserContainer onClick={onClick}>
      <Avatar
        width={"48px"}
        height={"48px"}
        src={profilePicture ?? icon}
        onClick={() => onClick ?? navigate(`/profile/${id}`)}
        alt={name ?? "Name"}
      />
      <StyledUserInfoContainer>
        <StyledP primary>{name ?? "Name"}</StyledP>
        <StyledP primary={false}>{"@" + username ?? "@Username"}</StyledP>
      </StyledUserInfoContainer>
    </StyledUserContainer>
  );
};

export default UserDataBox;
