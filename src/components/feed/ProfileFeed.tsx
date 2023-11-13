import React from "react";
import Feed from "./Feed";
import { useGetProfilePosts } from "../../hooks/useGetProfilePosts";

const ProfileFeed = () => {
  const { posts, loading , error} = useGetProfilePosts();

  return (
    <>
      <Feed posts={posts} loading={loading} error={error}/>
    </>
  );
};
export default ProfileFeed;
