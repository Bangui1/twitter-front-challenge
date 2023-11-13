import React, { useEffect } from "react";
import SuggestionBox from "./components/suggestionBox/SuggestionBox";
import ContentContainer from "./components/contentContainer/ContentContainer";
import { setUser } from "../../redux/user";
import { useHttpRequestService } from "../../service/HttpRequestService";
import { SearchBar } from "../../components/search-bar/SearchBar";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { StyledUserSuggestionContainer } from "./UserSeuggestionContainer";
import {FollowDTO} from "../../service";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useAppSelector((state) => state.user.query);
  const service = useHttpRequestService();

  const handleSetUser = async () => {
    try {
      const user = await service.me();
      const follows = await service.getFollowing(user.user.id);
      const followers = await service.getFollowers(user.user.id);
      user.user.following = follows.map((follow: FollowDTO) => follow.followedId);
      user.user.followers = followers.map((follow: FollowDTO) => follow.followerId);
      dispatch(setUser(user.user));
    } catch (e) {
      navigate("/sign-in");
    }
  };

  useEffect(() => {
    handleSetUser().then();
  }, []);

  return (
    <>
      <ContentContainer />
      <StyledUserSuggestionContainer>
        <SearchBar />
        <SuggestionBox />
      </StyledUserSuggestionContainer>
    </>
  );
};

export default HomePage;
