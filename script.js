const parent = document.querySelector(".main-content");

fetch("https://dummyjson.com/posts/")
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    renderPosts(data.posts);
  });

let postArray = []; //

function renderPosts(posts) {
  for (let i = 0; i < posts.length; i++) {
    let post = posts[i];

    let createNewPost = document.createElement("div");
    postArray.push(createNewPost); //
    createNewPost.classList.add("post-container");

    let postTitle = document.createElement("h3");
    postTitle.classList.add("post-title");

    let postBody = document.createElement("span");
    postBody.classList.add("post-body");

    let postTagsDiv = document.createElement("div");
    postTagsDiv.classList.add("post-tags-container");

    let postTags = document.createElement("span");
    let postTags1 = document.createElement("span");
    let postTags2 = document.createElement("span");
    postTags.classList.add("post-tags");
    postTags1.classList.add("post-tags");
    postTags2.classList.add("post-tags");

    postTitle.innerText = post.title;
    postBody.innerText = post.body;

    postTags.innerText = post.tags[0] + " ";
    postTags1.innerText = post.tags[1] + " ";
    postTags2.innerText = post.tags[2];

    postTagsDiv.append(postTags, postTags1, postTags2);
    createNewPost.append(postTitle, postBody, postTagsDiv);

    parent.append(postArray[i]);
  }
}

let createButton = document.querySelector(".newPostButton");
let newPostWindow = document.querySelector(".newPostContainer");
let overlay = document.querySelector(".overlay");
let closeButton = document.querySelector(".close-window");

createButton.addEventListener("click", function () {
  newPostWindow.classList.add("flex");
  overlay.classList.add("flex");
});

closeButton.addEventListener("click", function () {
  newPostWindow.classList.remove("flex");
  overlay.classList.remove("flex");
});

let sendPostButton = document.querySelector(".send-post");

sendPostButton.addEventListener("click", function () {
  let title = document.querySelector(".newPostTitle");
  let text = document.querySelector(".newPostText");
  let tags1 = document.querySelector(".newPostTags1");
  let tags2 = document.querySelector(".newPostTags2");
  let tags3 = document.querySelector(".newPostTags3");

  let createNewPost = document.createElement("div");
  postArray.unshift(createNewPost);
  createNewPost.classList.add("post-container");

  let postTitle = document.createElement("h3");
  postTitle.classList.add("post-title");
  postTitle.innerText = title.value;

  let postBody = document.createElement("span");
  postBody.classList.add("post-body");
  postBody.innerText = text.value;

  let postTagsDiv = document.createElement("div");
  postTagsDiv.classList.add("post-tags-container");

  let postTags = document.createElement("span");
  let postTags1 = document.createElement("span");
  let postTags2 = document.createElement("span");
  postTags.classList.add("post-tags");
  postTags1.classList.add("post-tags");
  postTags2.classList.add("post-tags");

  postTags.innerText = tags1.value + " ";
  postTags1.innerText = tags2.value + " ";
  postTags2.innerText = tags3.value;

  postTagsDiv.append(postTags, postTags1, postTags2);
  createNewPost.append(postTitle, postBody, postTagsDiv);

  parent.insertBefore(createNewPost, postArray[1]);

  document.querySelector(".newPostTitle").value = "";
  document.querySelector(".newPostText").value = "";
  document.querySelector(".newPostTags1").value = "";
  document.querySelector(".newPostTags2").value = "";
  document.querySelector(".newPostTags3").value = "";

  // Close the new post window
  newPostWindow.classList.remove("flex");
  overlay.classList.remove("flex");
});
