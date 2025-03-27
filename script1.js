function addPost() {
  let userName = document.getElementById("userName").value.trim();
  let title = document.getElementById("postTitle").value.trim();
  let content = document.getElementById("postContent").value.trim();

  if (userName === "" || title === "" || content === "") {
    alert("Please fill in all fields!");
    return;
  }

  let postDiv = document.createElement("div");
  postDiv.classList.add("post");

  let timestamp = new Date().toLocaleString();

  postDiv.innerHTML = `
        <h3>${title}</h3>
        <p><strong>${userName}</strong> - <small>${timestamp}</small></p>
        <p>${content}</p>
        <button class="like-btn" onclick="likePost(this)">❤️ Like (<span>0</span>)</button>
        <button class="share-btn" onclick="sharePost('${title}', '${content}')">📤 Share</button>
        <div class="comment-section">
            <input type="text" class="comment-input" placeholder="Add a comment">
            <button class="comment-btn" onclick="addComment(this)">Comment</button>
            <div class="comments"></div>
        </div>
    `;

  document.getElementById("posts").prepend(postDiv);

  // Apply animation
  setTimeout(() => {
    postDiv.classList.add("show");
  }, 100);

  // Clear input fields
  document.getElementById("userName").value = "";
  document.getElementById("postTitle").value = "";
  document.getElementById("postContent").value = "";
  updateWordCount();
}

// Like a post
function likePost(btn) {
  let likeCount = btn.querySelector("span");
  let count = parseInt(likeCount.textContent);
  likeCount.textContent = count + 1;
}

// Share a post
function sharePost(title, content) {
  let text = `Check out this post: "${title}" - ${content}`;
  navigator.clipboard.writeText(text);
  alert("Post copied to clipboard!");
}

// Add a comment
function addComment(btn) {
  let commentInput = btn.previousElementSibling;
  let commentText = commentInput.value.trim();

  if (commentText === "") {
    alert("Please enter a comment!");
    return;
  }

  let commentDiv = document.createElement("p");
  commentDiv.textContent = commentText;
  btn.nextElementSibling.appendChild(commentDiv);
  commentInput.value = "";
}

// Word count update
function updateWordCount() {
  let content = document.getElementById("postContent").value.trim();
  let wordCount = content ? content.split(/\s+/).length : 0;
  document.getElementById("wordCount").textContent = `Words: ${wordCount}`;
}

// Dark/Light Mode Toggle
document.getElementById("themeToggle").addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
  this.textContent = document.body.classList.contains("dark-mode")
    ? "☀️"
    : "🌙";
});
