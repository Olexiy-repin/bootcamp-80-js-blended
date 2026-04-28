//TODO: BaseURL(https://69f06c1fc1533dbedc9cde50.mockapi.io)
import axios from 'axios';

axios.defaults.baseURL = 'https://69f06c1fc1533dbedc9cde50.mockapi.io';

export const getAllTasks = () => {
  return axios.get('/tasks');
};

export const createNewTask = task => {
  return axios.post('/tasks', task);
};

export const deleteTaskById = taskId => {
  return axios.delete(`/tasks/${taskId}`);
};
