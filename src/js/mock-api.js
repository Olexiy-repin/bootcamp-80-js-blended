import axios from 'axios';

export const getAllPosts = () => {
  return axios.get('https://69f06c1fc1533dbedc9cde50.mockapi.io/posts');
};

export const createNewPost = post => {
  return axios.post('https://69f06c1fc1533dbedc9cde50.mockapi.io/posts', post);
};

export const deletePostById = postId => {
  return axios.delete(`https://69f06c1fc1533dbedc9cde50.mockapi.io/posts/${postId}`);
};
