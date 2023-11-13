import {useCallback, useEffect, useState} from "react";
import { useHttpRequestService } from "../service/HttpRequestService";
import { setLength, updateFeed } from "../redux/user";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

export const useGetFeed = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [lastPostId, setLastPostId] = useState<string>(""); // [1
  const posts = useAppSelector((state) => state.user.feed);
  const query = useAppSelector((state) => state.user.query);

  const dispatch = useAppDispatch();

  const service = useHttpRequestService();


  function fetchPosts() {
    try {
      setLoading(true);
      setError(false);
      service.getPaginatedPosts(4, lastPostId, query).then((res) => {
        const updatedPosts = Array.from(new Set([...posts, ...res]));
        dispatch(updateFeed(updatedPosts));
        dispatch(setLength(updatedPosts.length));
        setLastPostId(updatedPosts[updatedPosts.length - 1].id);
        setLoading(false);
      });
    } catch (e) {
      setError(true);
      console.log(e);
    }
  }

  const handleScroll = useCallback(() => {
    const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 1) {
      console.log("fetching");
      console.log(query)
      fetchPosts();
    }
  }, [loading]);

  useEffect(() => {
    if(posts.length === 0){
      fetchPosts()
    }
  }, [query]);


  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  return { posts, loading, error };
};
