//TODO: BaseURL(https://69f06c1fc1533dbedc9cde50.mockapi.io)
import axios from 'axios';

axios.defaults.baseURL = 'https://69f06c1fc1533dbedc9cde50.mockapi.io';

export const getAllTasks = async () => {
  const { data } = await axios.get('/tasks');

  return data;
};

export const createNewTask = async task => {
  const { data } = await axios.post('/tasks', task);

  return data;
};

export const deleteTaskById = async taskId => {
  const { data } = await axios.delete(`/tasks/${taskId}`);

  return data;
};
