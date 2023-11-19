import type { PostData, SingInData, SingUpData } from "./index";
import axios from "axios";
import { S3Service } from "./S3Service";

const url =
  process.env.REACT_APP_API_URL || "http://localhost:8080/api";

const api = axios.create({
  baseURL: url,
})

api.interceptors.request.use(
    config => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers['Authorization'] = token;
      }
      return config;
    },
    error => {
      Promise.reject(error);
    }
)

api.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/";
      }
      return error;
    }
)


const httpRequestService = {
  signUp: async (data: Partial<SingUpData>) => {
    const res = await axios.post(`${url}/auth/signup`, data);
    if (res.status === 201) {
      localStorage.setItem("token", `Bearer ${res.data.token}`);
      return true;
    }
  },
  signIn: async (data: SingInData) => {
    const res = await axios.post(`${url}/auth/login`, data);
    if (res.status === 200) {
      localStorage.setItem("token", `Bearer ${res.data.token}`);
      return true;
    }
  },
  createPost: async (data: PostData) => {
    const postData = {
      ...data,
      images: data.images?.map((image) => image.name),
    };
    console.log(postData)
    const res = await api.post(`/post`, postData);
    if (res.status === 201) {
      const { upload } = S3Service;
      for (const imageUrl of res.data.images) {
        const index: number = res.data.images.indexOf(imageUrl);
        await upload(data.images![index], imageUrl);
      }
      return res.data;
    }
  },
  getPaginatedPosts: async (limit: number, after: string, query: string) => {
    const res = await api.get(`/post/${query}`, {
      params: {
        limit,
        after,
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  },
  getPosts: async (query: string) => {
    const res = await api.get(`/post/${query}`);
    if (res.status === 200) {
      return res.data;
    }
  },
  getRecommendedUsers: async (limit: number, skip: number) => {
    const res = await api.get(`/user`, {
      params: {
        limit,
        skip,
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  },
  me: async () => {
    const res = await api.get(`/user/me`);
    if (res.status === 200) {
      return res.data;
    }
  },
  getPostById: async (id: string) => {
    const res = await api.get(`/post/${id}`);
    if (res.status === 200) {
      return res.data;
    }
  },
  createReaction: async (postId: string, reaction: string) => {
    const res = await api.post(
      `/reaction/${postId}`,
      { reactionType: reaction }
    );
    if (res.status === 201) {
      return res.data;
    }
  },
  deleteReaction: async (postId: string, type: string) => {
    const res = await api.delete(`/reaction/${postId}`, {
      data: {
        reactionType: type,
      },
      }
    );
    if (res.status === 200) {
      return res.data;
    }
  },
  followUser: async (userId: string) => {
    const res = await api.post(
      `/follower/follow/${userId}`,
      {},
    );
    if (res.status === 201) {
      return res.data;
    }
  },
  unfollowUser: async (userId: string) => {
    const res = await api.post(`/follower/unfollow/${userId}`,{});
    if (res.status === 200) {
      return res.data;
    }
  },
  searchUsers: async (username: string, limit: number, skip: number) => {
    try {
      const cancelToken = axios.CancelToken.source();

      const response = await api.get(`/user/by_username/${username}`, {
        params: {
          limit,
          skip,
        },
        cancelToken: cancelToken.token,
      });

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      if (!axios.isCancel(error)) console.log(error);
    }
  },

  getProfile: async (id: string) => {
    const res = await api.get(`/user/${id}`);
    if (res.status === 200) {
      return res.data;
    }
  },
  getPaginatedPostsFromProfile: async (
    limit: number,
    after: string,
    id: string
  ) => {
    const res = await api.get(`/post/by_user/${id}`, {
      params: {
        limit,
        after,
      },
    });

    if (res.status === 200) {
      return res.data;
    }
  },
  getPostsFromProfile: async (id: string, limit: number, after: string) => {
    const res = await api.get(`/post/by_user/${id}`, {
        params: {
            limit,
            after,
        },
    });

    if (res.status === 200) {
      return res.data;
    }
  },

  isLogged: async () => {
    const res = await api.get(`/user/me`);
    return res.status === 200;
  },

  getProfileView: async (id: string) => {
    const res = await api.get(`/user/${id}`);

    if (res.status === 200) {
      return res.data;
    }
  },

  deleteProfile: async () => {
    const res = await api.delete(`/user/me`);

    if (res.status === 204) {
      localStorage.removeItem("token");
    }
  },

  getChats: async () => {
    const res = await api.get(`/chat`);

    if (res.status === 200) {
      return res.data;
    }
  },

  getMutualFollows: async () => {
    const res = await api.get(`/follow/mutual`);

    if (res.status === 200) {
      return res.data;
    }
  },

  createChat: async (id: string) => {
    const res = await api.post(
      `/chat`,
      {
        users: [id],
      });
    if (res.status === 201) {
      return res.data;
    }
  },

  getChat: async (id: string) => {
    const res = await api.get(`/chat/${id}`);

    if (res.status === 200) {
      return res.data;
    }
  },

  deletePost: async (id: string) => {
    await api.delete(`/post/${id}`);
  },

  getPaginatedCommentsByPostId: async (
    id: string,
    limit: number,
    after: string
  ) => {
    const res = await api.get(`/post/comment/by_post/${id}`, {
      params: {
        limit,
        after,
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  },
  getCommentsByPostId: async (id: string, limit: number, after: string) => {
    const res = await api.get(`/post/comment/${id}`, {
      params: {
        limit,
        after,
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  },
  getFollowing: async (id: string) => {
    const res = await api.get(`/follower/follows/${id}`);
    if (res.status === 200) {
      return res.data;
    }
  },
  getFollowers: async (id: string) => {
    const res = await api.get(`/follower/followers/${id}`);
    if (res.status === 200) {
      return res.data;
    }
  },
  createChatroom: async (id: string) => {
    const res = await api.post(`/chat/chatroom/${id}`);
    if (res.status === 200){
        return res.data;
    }
  },
  getChatrooms: async () => {
    const res = await api.get(`/chat/chatroom/chats`);
    console.log(res.data)
    if (res.status === 200){
        return res.data;
    }
  },
  getChatData: async (id: string) => {
    const res = await api.get(`/chat/chatroom/${id}`);
    if (res.status === 200){
        return res.data;
    }
  }
};

const useHttpRequestService = () => httpRequestService;

// For class component (remove when unused)
class HttpService {
  service = httpRequestService;
}

export { useHttpRequestService, HttpService };
