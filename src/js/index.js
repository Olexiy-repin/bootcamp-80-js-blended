import { getAllTasks, createNewTask, deleteTaskById } from './tasks-api';
import { createTaskCardTemplate } from './render-functions';
import { refs } from './refs';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const initTasksList = () => {
  refs.taskList.innerHTML = '';
  refs.preloader.classList.add('is-active');

  getAllTasks()
    .then(({ data: tasksArr }) => {
      const tasksCardsTemplate = tasksArr.map(task => createTaskCardTemplate(task)).join('');

      refs.taskList.innerHTML = tasksCardsTemplate;
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      refs.preloader.classList.remove('is-active');
    });
};

initTasksList();

const onTaskFormSubmit = event => {
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

  createNewTask(newTask)
    .then(response => {
      iziToast.success({
        message: 'Задача додана успішно!',
        position: 'topRight',
      });

      taskFormEl.reset();

      initTasksList();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      refs.taskFormSbmtBtn.disabled = false;
    });
};

const onDeleteTaskBtnClick = event => {
  const currentTaskDeleteBtnEl = event.target.closest('.js-tasks-list-item-delete-btn');

  if (!currentTaskDeleteBtnEl) {
    return;
  }

  const currentTaskId = currentTaskDeleteBtnEl.dataset.taskId;

  deleteTaskById(currentTaskId)
    .then(response => {
      iziToast.success({
        message: 'Видалення пройшло успішно!',
        position: 'topRight',
      });

      initTasksList();
    })
    .catch(err => {
      console.log(err);
    });
};

refs.taskForm.addEventListener('submit', onTaskFormSubmit);
refs.taskList.addEventListener('click', onDeleteTaskBtnClick);
