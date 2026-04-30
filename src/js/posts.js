import { getAllPosts, createNewPost, deletePostById } from './mock-api';
import { createPostCardTemplate } from './render-functions';

const refs = {
  postsList: document.querySelector('.js-posts-list'),
  postForm: document.querySelector('.js-post-form'),
};

const renderPosts = () => {
  getAllPosts()
    .then(({ data: postsArr }) => {
      const postCardsTemplate = postsArr.map(post => createPostCardTemplate(post)).join('');

      refs.postsList.innerHTML = postCardsTemplate;
    })
    .catch(err => {
      console.log(err);
    });
};

renderPosts();

const onPostFormSubmit = event => {
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

  createNewPost(newPost)
    .then(({ data: post }) => {
      alert(`${post.post_title} додано успішно!`);

      postFormEl.reset();

      renderPosts();
    })
    .catch(err => {
      console.log(err);
    });
};

const onPostDeleteBtnClick = event => {
  const currentPostDeleteBtnEl = event.target.closest('.js-post-delete-btn');

  if (!currentPostDeleteBtnEl) {
    return;
  }

  const currentPostId = currentPostDeleteBtnEl.dataset.postId;

  deletePostById(currentPostId)
    .then(({ data: deletedPost }) => {
      alert(`${deletedPost.post_title} видалено успішно!`);

      renderPosts();
    })
    .catch(err => {
      console.log(err);
    });
};

refs.postForm.addEventListener('submit', onPostFormSubmit);
refs.postsList.addEventListener('click', onPostDeleteBtnClick);
