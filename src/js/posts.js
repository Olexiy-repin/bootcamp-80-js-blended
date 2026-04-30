import { getAllPosts, createNewPost, deletePostById } from './mock-api';
import { createPostCardTemplate } from './render-functions';

const refs = {
  postsList: document.querySelector('.js-posts-list'),
  postForm: document.querySelector('.js-post-form'),
};

const renderPosts = async () => {
  try {
    const postsArr = await getAllPosts();

    const postCardsTemplate = postsArr.map(post => createPostCardTemplate(post)).join('');

    refs.postsList.innerHTML = postCardsTemplate;
  } catch (err) {
    console.log(err);
  }
};

renderPosts();

const onPostFormSubmit = async event => {
  try {
    event.preventDefault();

    const { target: postFormEl } = event;

    const newPost = {
      post_title: postFormEl.elements.post_title.value.trim(),
      post_body: postFormEl.elements.post_body.value.trim(),
    };

    const newPostValues = Object.values(newPost);

    if (newPostValues.includes('')) {
      alert('Усі поля мають бути заповнені!');

      return;
    }

    const post = await createNewPost(newPost);

    alert(`${post.post_title} додано успішно!`);

    postFormEl.reset();

    renderPosts();
  } catch (error) {
    console.log(err);
  }
};

const onPostDeleteBtnClick = async event => {
  try {
    const currentPostDeleteBtnEl = event.target.closest('.js-post-delete-btn');

    if (!currentPostDeleteBtnEl) {
      return;
    }

    const currentPostId = currentPostDeleteBtnEl.dataset.postId;

    const deletedPost = await deletePostById(currentPostId);

    alert(`${deletedPost.post_title} видалено успішно!`);

    renderPosts();
  } catch (error) {
    console.log(error);
  }
};

refs.postForm.addEventListener('submit', onPostFormSubmit);
refs.postsList.addEventListener('click', onPostDeleteBtnClick);
