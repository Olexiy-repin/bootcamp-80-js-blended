import { getAllTasks, createNewTask, deleteTaskById } from './tasks-api';
import { createTaskCardTemplate } from './render-functions';
import { refs } from './refs';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const initTasksList = async () => {
  try {
    refs.taskList.innerHTML = '';

    refs.preloader.classList.add('is-active');

    const tasksArr = await getAllTasks();

    const tasksCardsTemplate = tasksArr.map(task => createTaskCardTemplate(task)).join('');

    refs.taskList.innerHTML = tasksCardsTemplate;
  } catch (error) {
    console.log(error);
  } finally {
    refs.preloader.classList.remove('is-active');
  }
};

initTasksList();

const onTaskFormSubmit = async event => {
  try {
    event.preventDefault();

    const { target: taskFormEl } = event;

    const newTask = {
      text: taskFormEl.elements.task_text.value.trim(),
    };

    if (!newTask.text) {
      iziToast.error({
        message: 'Поле для введення не має бути порожнім!',
        position: 'topRight',
      });

      return;
    }

    refs.taskFormSbmtBtn.disabled = true;

    await createNewTask(newTask);

    iziToast.success({
      message: 'Задача додана успішно!',
      position: 'topRight',
    });

    taskFormEl.reset();

    initTasksList();
  } catch (error) {
    console.log(error);
  } finally {
    refs.taskFormSbmtBtn.disabled = false;
  }
};

const onDeleteTaskBtnClick = async event => {
  try {
    const currentTaskDeleteBtnEl = event.target.closest('.js-tasks-list-item-delete-btn');

    if (!currentTaskDeleteBtnEl) {
      return;
    }

    const currentTaskId = currentTaskDeleteBtnEl.dataset.taskId;

    await deleteTaskById(currentTaskId);

    iziToast.success({
      message: 'Видалення пройшло успішно!',
      position: 'topRight',
    });

    initTasksList();
  } catch (error) {
    console.log(error);
  }
};

refs.taskForm.addEventListener('submit', onTaskFormSubmit);
refs.taskList.addEventListener('click', onDeleteTaskBtnClick);
