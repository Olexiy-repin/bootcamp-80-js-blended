/*
<li class="posts-list-item">
  <button class="post-delete-btn" type="button" data-delete data-post-id="">
    <svg class="post-delete-icon" width="18" height="18">
      <use href="../images/icons.svg#icon-trash"></use>
    </svg>
  </button>
  <h3 class="posts-list-item-title"></h3>
  <p class="posts-list-item-text"></p>
</li>
*/

export const createPostCardTemplate = ({ id, post_title, post_body }) => {
  return `
    <li class="posts-list-item">
      <button class="post-delete-btn js-post-delete-btn" type="button" data-delete data-post-id="${id}">
        <svg class="post-delete-icon" width="18" height="18">
          <use href="../images/icons.svg#icon-trash"></use>
        </svg>
      </button>
      <h3 class="posts-list-item-title">${post_title}</h3>
      <p class="posts-list-item-text">${post_body}</p>
    </li>
  `;
};
