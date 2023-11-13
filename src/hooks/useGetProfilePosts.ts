import {useCallback, useEffect, useState} from "react";
import { useHttpRequestService } from "../service/HttpRequestService";
import { updateFeed } from "../redux/user";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {Post} from "../service";

export const useGetProfilePosts = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [lastPostId, setLastPostId] = useState<string>("");
  const dispatch = useAppDispatch();
  const id = useParams().id;
  const service = useHttpRequestService();

  function fetchPosts() {
    if (!id) return;
    setLoading(true);
    setError(false);
    service
        .getPostsFromProfile(id, 4, lastPostId)
        .then((res) => {
          const updatedPosts = Array.from(new Set([...posts, ...res])).filter(
              (post) => post.authorId === id
          );
          setPosts(updatedPosts);
          setLastPostId(updatedPosts[updatedPosts.length - 1].id);
          setLoading(false);
        })
        .catch(() => {
          setError(true);
          setLoading(false);
        });
  }

  const handleScroll = useCallback(() => {
    const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 1) {
      console.log("fetching");
      fetchPosts();
    }
  }, [loading]);

  useEffect(() => {
    if (posts.length === 0){
      fetchPosts();
    }
  }, [id]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  return { posts, loading, error };
};
