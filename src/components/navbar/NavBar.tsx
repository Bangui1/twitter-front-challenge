import React, {useMemo, useState} from "react";
import NavItem from "./navItem/NavItem";
import Button from "../button/Button";
import {useLocation, useNavigate} from "react-router-dom";
import {StyledTweetButton} from "../tweet-button/StyledTweetButton";
import TweetModal from "../tweet-modal/TweetModal";
import {IconType, LogoIcon} from "../icon/Icon";
import Avatar from "../common/avatar/Avatar";
import LogoutPrompt from "./logout-prompt/LogoutPrompt";
import ThreeDots from "../common/ThreeDots";
import {useTranslation} from "react-i18next";
import {ButtonSize, ButtonType} from "../button/StyledButton";
import Icon from "../../assets/icon.jpg";
import {useAppSelector} from "../../redux/hooks";
import {NavBarLittleDots, StyledNavBarContainer} from "./NavBarContainer";
import {StyledContainer} from "../common/Container";
import {StyledIconContainer} from "./IconContainer";
import {StyledNavItemsContainer} from "./navItem/NavItemsContainer";
import {StyledP} from "../common/text";
import {useOutsideAlerter} from "../../hooks/useOutsideAlerter";
import {NavDataContainer} from "./navItem/NavDataContainer";
import {NavAvatarContainer} from "./navItem/NavAvatarContainer";

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);
  const [tweetModalOpen, setTweetModalOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const { t } = useTranslation();
  const alerter = useOutsideAlerter({onOutsideClick: () => setLogoutOpen(false)})
  const isInBlacklist = useMemo(() => {
    return ["messages"]
        .every((path) => !location.pathname.includes(path));
  }, [location.pathname]);
  const handleAvatarClick = () => {
    if (window.innerWidth < 1265) {
      handleLogout();
    } else {
      navigate(`/profile/${user.id}`);
    }
  };

  const handleLogout = () => {
    setLogoutOpen(!logoutOpen);
  };

  return (
    <StyledNavBarContainer>
      <StyledContainer flex={1}>
        <StyledIconContainer>
          <LogoIcon />
        </StyledIconContainer>
        <StyledNavItemsContainer>
          <NavItem
            title={t("navbar.home")}
            onClick={() => {
              navigate("/");
            }}
            icon={IconType.HOME}
            selectedIcon={IconType.ACTIVE_HOME}
            active={location.pathname === "/"}
          />
          <NavItem
            title={t("navbar.profile")}
            onClick={() => {
              navigate(`/profile/${user.id}`);
            }}
            icon={IconType.PROFILE}
            selectedIcon={IconType.ACTIVE_PROFILE}
            active={location.pathname === `/profile/${user.id}`}
          />
          <NavItem
              title={t("navbar.message")}
              icon={IconType.MESSAGE}
              selectedIcon={IconType.ACTIVE_MESSAGE}
              onClick={() => {
                navigate("/messages");
              }}
              active={location.pathname === `/messages`}
          />
          {isInBlacklist && <StyledTweetButton
            onClick={() =>
              window.innerWidth > 600
                ? setTweetModalOpen(true)
                : navigate("/compose/tweet")
            }
          >
            +
          </StyledTweetButton>}
        </StyledNavItemsContainer>
        <StyledContainer width={"100%"}>
          <Button
            text={"Tweet"}
            size={ButtonSize.MEDIUM}
            buttonType={ButtonType.DEFAULT}
            onClick={() => {
              setTweetModalOpen(true);
            }}
          ></Button>
        </StyledContainer>
        <TweetModal
          open={tweetModalOpen}
          onClose={() => {
            setTweetModalOpen(false);
          }}
        />
      </StyledContainer>
      <NavAvatarContainer
        maxHeight={"48px"}
        flexDirection={"row"}
        gap={"8px"}
      >
        <LogoutPrompt show={logoutOpen} alerter={alerter} />
        <Avatar
          src={user.profilePicture ?? Icon}
          onClick={handleAvatarClick}
          alt={user?.name ?? ""}
        />
        <NavDataContainer
          width={"100%"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <StyledContainer padding={"4px 0"} gap={"4px"}>
            <StyledP primary>{user.name}</StyledP>
            <StyledP primary={false}>{`@${user.username}`}</StyledP>
          </StyledContainer>
          <NavBarLittleDots onClick={handleLogout} />
        </NavDataContainer>
      </NavAvatarContainer>
    </StyledNavBarContainer>
  );
};

export default NavBar;
