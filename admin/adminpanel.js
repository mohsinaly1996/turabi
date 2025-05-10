const token = localStorage.getItem("token");
async function checkForToken() {
  if (!token) {
    alert("token expires");
    window.location.href = "./loginAdmin.html";
  } else if (token) {
    const response = await fetch("http://localhost:3000/auth/JWTVerify/:token");
    const feed = await response.json();
    console.log(feed);
  }
}
// checkForToken();

// SECTION DISPLAYED
const sections = ["Dashboard", "Posts", "Users", "Settings"];
function toggleSection(showId) {
  sections.forEach((id) => {
    document.getElementById(id).style.display =
      id === showId ? "block" : "none";
  });
}

btnDashboard.addEventListener("click", () => toggleSection("Dashboard"));
btnPosts.addEventListener("click", () => toggleSection("Posts"));
btnUsers.addEventListener("click", () => toggleSection("Users"));
btnSettings.addEventListener("click", () => toggleSection("Settings"));

//GET ALL POST
const allpost = document.getElementById("allpost");
const getAllPost = async () => {
  try {
    const response = await fetch("http://localhost:3000/blog");
    const responseJson = await response.json();
    console.log(responseJson.data);
    let postData = [];
    responseJson.data.map((element) => {
      postData.push(`
          <div class="post">
            <div class="postTitle">
              <h3>${element.heading}</h3>
              <div class="btnPost">
                <button id="editPost">Edit</button>
                <button id="deletePost">Delete</button>
              </div>
            </div>
          </div>`);
          postData=postData.join(" ")
      return postData;
    });
    allpost.innerHTML = postData;
  } catch (error) {
    console.log(error);
  }
};
getAllPost();

// POST MODAL OPEN
document.getElementById("openModal").addEventListener("click", () => {
  document.getElementById("postModal").style.display = "flex";
});

// POST MODAL CLOSE
document.getElementById("cross1").addEventListener("click", () => {
  document.getElementById("postModal").style.display = "none";
});

// EDIT MODAL OPEN
document.getElementById("editPost").addEventListener("click", () => {
  document.getElementById("editModal").style.display = "flex";
});


// EDIT MODAL CLOSE
document.getElementById("cross2").addEventListener("click", () => {
  document.getElementById("editModal").style.display = "none";
});

