import {useCallback, useEffect, useState} from "react";
import { useHttpRequestService } from "../service/HttpRequestService";
import {Post} from "../service";

interface UseGetCommentsProps {
  postId: string;
}

export const useGetComments = ({ postId }: UseGetCommentsProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [lastCommentId, setLastCommentId] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);
  const service = useHttpRequestService();

  function fetchComments() {
    try {
      setLoading(true);
      service.getCommentsByPostId(postId, 3, lastCommentId).then((res) => {
        const updatedPosts = Array.from(new Set([...posts, ...res])).filter(
            (post) => post.parentPostId === postId
        );
        setPosts(updatedPosts);
        setLastCommentId(updatedPosts[updatedPosts.length - 1].id)
        setError(res.length === 0)
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
      fetchComments();
    }
  }, [loading]);

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])


  return { posts, loading, error };
};
