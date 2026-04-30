import axios from 'axios';

axios.defaults.baseURL = 'https://69f06c1fc1533dbedc9cde50.mockapi.io';

export const getAllPosts = async () => {
  const { data } = await axios.get('/posts');

  return data;
};

export const createNewPost = async post => {
  const { data } = await axios.post('/posts', post);

  return data;
};

export const deletePostById = async postId => {
  const { data } = await axios.delete(`/posts/${postId}`);

  return data;
};
