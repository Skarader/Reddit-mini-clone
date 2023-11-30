const parent = document.querySelector(".main-content");
const newParent = document.querySelector(".new-main-content");

// fetcha info från dummyjson

fetch("https://dummyjson.com/posts/")
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    renderPosts(data.posts);
  });

// array där all inlägg "sparas"

let postArray = [];

// rendera ut all post från dummyjson

function renderPosts(posts) {
  for (let i = 0; i < posts.length; i++) {
    let post = posts[i];

    let createNewPost = document.createElement("div");
    postArray.push(createNewPost);
    createNewPost.classList.add("post-container");

    let postTitle = document.createElement("h3");
    postTitle.classList.add("post-title");
    postTitle.innerText = post.title;

    let postBody = document.createElement("span");
    postBody.classList.add("post-body");
    postBody.innerText = post.body;

    let postTagsDiv = document.createElement("div");
    postTagsDiv.classList.add("post-tags-container");

    let postTags = document.createElement("span");
    let postTags1 = document.createElement("span");
    let postTags2 = document.createElement("span");
    postTags.classList.add("post-tags");
    postTags1.classList.add("post-tags");
    postTags2.classList.add("post-tags");

    let thumbsUp = document.createElement("img");
    thumbsUp.src = "pictures/thumbs-up.png";
    thumbsUp.classList.add("thumbs-up");

    let reactions = document.createElement("span");
    reactions.classList.add("reactions");

    // local storage samt eventlistenr för att "likea" inlägg och spara alla likes.

    post.reactions =
      localStorage.getItem(`post_${i}_reactions`) || post.reactions;

    thumbsUp.addEventListener("click", function handleReactionClick() {
      post.reactions++;
      reactions.innerText = post.reactions;

      localStorage.setItem(`post_${i}_reactions`, post.reactions.toString());

      thumbsUp.removeEventListener("click", handleReactionClick);
    });

    postTags.innerText = post.tags[0] + " ";
    postTags1.innerText = post.tags[1] + " ";
    postTags2.innerText = post.tags[2];

    reactions.innerText = post.reactions;

    postTagsDiv.append(postTags, postTags1, postTags2);
    createNewPost.append(postTitle, postBody, postTagsDiv, reactions, thumbsUp);

    parent.append(postArray[i]);

    //localStorage.removeItem(`post_${i}_reactions`); // Möjlighet att ta bort alla sparade likes för dummyjson posts
  }
}

// Knapp och eventlistener för att skapa nya posts

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

// local storage för all nya posts.

let newPostArray = JSON.parse(localStorage.getItem("savedPosts")) || [];

let sendPostButton = document.querySelector(".send-post");

// rendera ut all nya posts som skapas, postId är för att komma individuallisera inläggen. kommer ihåg vilket inlägg som skapas/likeas

function createNewPostDiv(post, postId) {
  let createNewPost = document.createElement("div");
  createNewPost.classList.add("post-container");

  let postTitle = document.createElement("h3");
  postTitle.classList.add("post-title");
  postTitle.innerText = post.title;

  let postBody = document.createElement("span");
  postBody.classList.add("post-body");
  postBody.innerText = post.text;

  let postTagsDiv = document.createElement("div");
  postTagsDiv.classList.add("post-tags-container");

  let postTags = document.createElement("span");
  let postTags1 = document.createElement("span");
  let postTags2 = document.createElement("span");
  postTags.classList.add("post-tags");
  postTags1.classList.add("post-tags");
  postTags2.classList.add("post-tags");

  let reactions = document.createElement("span");
  reactions.classList.add("reactions");

  let amountOfReactions = localStorage.getItem(`reactionsCount_${postId}`) || 0;
  reactions.innerText = amountOfReactions;

  let thumbsUp = document.createElement("img");
  thumbsUp.src = "pictures/thumbs-up.png";
  thumbsUp.classList.add("thumbs-up");

  // Eventlistener för att kunna likea nya posts

  thumbsUp.addEventListener("click", function handleReactionClick() {
    amountOfReactions++;
    reactions.innerText = amountOfReactions;

    localStorage.setItem(
      `reactionsCount_${postId}`,
      amountOfReactions.toString()
    );

    thumbsUp.removeEventListener("click", handleReactionClick);
  });

  // localStorage.removeItem(`reactionsCount_${postId}`); // Möjlgheten att ta bort alla sparade likes på nya posts

  postTags.innerText = post.tags1 + " ";
  postTags1.innerText = post.tags2 + " ";
  postTags2.innerText = post.tags3;

  postTagsDiv.append(postTags, postTags1, postTags2);
  createNewPost.append(postTitle, postBody, postTagsDiv, reactions, thumbsUp);

  return createNewPost;
}

// loopa igenom nya posts och appenda de till sidan.

for (let i = 0; i < newPostArray.length; i++) {
  let createdPostDiv = createNewPostDiv(
    newPostArray[i],
    newPostArray[i].postId
  );
  newParent.append(createdPostDiv);
}

// generare unikt id för alla skapade posts

function generateId() {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `${timestamp}_${random}`;
}

// eventlistener och function till att skapa nya posts när man klickar på send post knappen

sendPostButton.addEventListener("click", function () {
  let title = document.querySelector(".newPostTitle");
  let text = document.querySelector(".newPostText");
  let tags1 = document.querySelector(".newPostTags1");
  let tags2 = document.querySelector(".newPostTags2");
  let tags3 = document.querySelector(".newPostTags3");

  let newPostObject = {
    title: title.value,
    text: text.value,
    tags1: tags1.value,
    tags2: tags2.value,
    tags3: tags3.value,
    postId: generateId(),
    reactions: 0,
  };

  newPostArray.unshift(newPostObject);

  localStorage.setItem("savedPosts", JSON.stringify(newPostArray));

  let createdPostDiv = createNewPostDiv(newPostObject, newPostObject.postId);
  newParent.insertBefore(createdPostDiv, newParent.firstChild);

  document.querySelector(".newPostTitle").value = "";
  document.querySelector(".newPostText").value = "";
  document.querySelector(".newPostTags1").value = "";
  document.querySelector(".newPostTags2").value = "";
  document.querySelector(".newPostTags3").value = "";

  newPostWindow.classList.remove("flex");
  overlay.classList.remove("flex");
});

// localStorage.removeItem(`savedPosts`); // Möjligheten att ta bort alla sparade posts
