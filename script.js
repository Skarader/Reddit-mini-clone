const parent = document.querySelector(".main-content");

fetch("https://dummyjson.com/posts/")
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    renderPosts(data.posts);
  });

function renderPosts(posts) {
  for (let i = 0; i < 5; i++) {
    let post = posts[i];

    let createNewPost = document.createElement("div");
    createNewPost.classList.add("post-container");
    let postTitle = document.createElement("h3");
    postTitle.classList.add("post-title");
    let postBody = document.createElement("span");
    postBody.classList.add("post-body");

    postTitle.innerText = post.title;
    postBody.innerText = post.body;

    createNewPost.append(postTitle, postBody);
    parent.append(createNewPost);
  }
}

/*
fetch("https://dummyjson.com/posts/1")
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    renderPosts(data);
  });

function renderPosts(data) {
  console.log(data);
}

*/
