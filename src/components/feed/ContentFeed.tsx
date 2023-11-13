import React from "react";
import Feed from "./Feed";
import { useGetFeed } from "../../hooks/useGetFeed";

const ContentFeed = () => {
  const { posts, loading, error } = useGetFeed();

  return <Feed posts={posts} loading={loading} error={error} />;
};
export default ContentFeed;
