import axios from "axios";

const API = axios.create({ baseURL: 'https://a-socials-server-jny7w6fuh-aabidkhan0786.vercel.app/' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('Profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('Profile')).accesstoken}`;
    console.log(req.headers.Authorization.split(" ")[1]);
  }

  return req;
});

// const url='http://localhost:8000/'

export const fetchAllPosts = ()=> API.get(`aak/posts`)
export const createPosts = (newPost)=> API.post(`aak/posts`,newPost)
export const getMyTimeline = (id)=> API.get(`aak/posts/timeline/${id}`)
export const likePost = (postId,userId) => API.put(`/aak/posts/${postId}/like`,userId)
export const updatePost=(postId,updateDetails) =>API.put(`aak/posts/${postId}`,updateDetails)
export const deletePost=(postId) =>API.delete(`aak/posts/${postId}`)

export const logIn = (loginDetails)=> API.post(`aak/auth/login`,loginDetails)
export const register = (loginDetails)=> API.post(`aak/auth/register`,loginDetails)
export const getAllUsers = ()=> API.get('aak/user')
export const findUser = (userId)=> API.get(`aak/user/find?userId=${userId}`)
export const updateUser =(userId,updateDetails)=> API.put(`aak/user/${userId}`,updateDetails)
export const followUser = (followerId,userId) => API.put(`aak/user/${followerId}/follow`,userId)