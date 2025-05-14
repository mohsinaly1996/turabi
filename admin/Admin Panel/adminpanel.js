// Check for Token
const token = localStorage.getItem("token");
async function checkForToken() {
  if (!token) {
    alert("Token expired");
    window.location.href = "./loginAdmin.html";
  }
  else {
    try {
      const response = await fetch(`http://localhost:3000/auth/JWTVerify/${token}`);
      const feed = await response.json();

      const isAdmin = await fetch(`http://localhost:3000/user/${feed.data.email}`);
      const isAdminJson = await isAdmin.json();
      if (!isAdminJson.data.admin || !feed.status) {
        alert("Can't perform action may be token expire")
        window.location.href = "../Login/loginAdmin.html";
      }
    }
    catch (error) {
      alert("Token verification failed:", error);
      window.location.href = '../Login/loginAdmin.html';
    }
  }
}
checkForToken();
getAllPostStats();

// Section Toggle Logic
const sections = ["Dashboard", "Posts", "Users", "Settings"];
function toggleSection(showId) {
  sections.forEach((id) => {
    const section = document.getElementById(id);
    if (section) {
      section.style.display = id === showId ? "block" : "none";
    }
  });
}

// Button Elements
const btnDashboard = document.getElementById("btnDashboard");
const btnPosts = document.getElementById("btnPosts");
const btnUsers = document.getElementById("btnUsers");
const btnSettings = document.getElementById("btnSettings");

btnDashboard?.addEventListener("click", () => {
  toggleSection("Dashboard")
  // getAllPostStats();
})
btnPosts?.addEventListener("click", () => {
  toggleSection("Posts");
  getAllPost();
});
btnUsers?.addEventListener("click", () => toggleSection("Users"));
btnSettings?.addEventListener("click", () => toggleSection("Settings"));


// Get All Posts
const allpost = document.getElementById("allpost");
let languages = [];
const getAllPost = async () => {
  try {

    allpost.innerHTML = `<i class="fa-solid fa-loader"></i>`
    const response = await fetch("http://localhost:3000/blog");
    const data = await response.json();

    if (!data.status) {
      allpost.innerHTML = `<h1>${data.message}</h1>`
      return;
    }

    allpost.innerHTML = "";
    data.data.forEach((element) => {
      languages.push(element.language);
      allpost.innerHTML += `
        <div class="post" id="${element._id}">
          <div class="postTitle">
            <h3>${element.heading}</h3>
            <div class="btnPost">
              <button class="editPost">Edit</button>
              <button class="deletePost">Delete</button>
            </div>
          </div>
        </div>`;
    });

    languages.map((e) => {
      document.getElementById('dropDown').innerHTML += `
        <option value="${e}">${e}</option>`
    })
  }
  catch (error) {
    console.error("Failed to load posts:", error);
  }
};

// STATS
async function getAllPostStats() {
  try {
    const response = await fetch("http://localhost:3000/blog");
    const data = await response.json();
    if (data.status) {
      document.getElementById('postCount').innerText = data.data.length
      document.getElementById('pendingStat').innerText = 0
    }
    else {
      document.getElementById('postCount').innerText = 0
      document.getElementById('pendingStat').innerText = 0
    }
  }
  catch (error) {
    alert(error);
  }
}

// Handle Edit/Delete Clicks (Dynamic)
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("editPost")) {
    editPostHandler(e.target.parentElement.parentElement.parentElement.id);
  }

  if (e.target.classList.contains("deletePost")) {
    deletePost(e.target.parentElement.parentElement.parentElement.id)
  }
});


// Modal Open/Close Buttons
document.getElementById("openModal")?.addEventListener("click", () => {
  document.getElementById("postModal").style.display = "flex";
});

document.getElementById("cross1")?.addEventListener("click", () => {
  document.getElementById("postModal").style.display = "none";
});

document.getElementById("cross2")?.addEventListener("click", () => {
  document.getElementById("editModal").style.display = "none";
});

// POST MODAL
const postTitle = document.getElementById('postTitle');
const text1 = document.getElementById('text1');
const text2 = document.getElementById('text2');
const referenceText1 = document.getElementById('referenceText1');
const referenceText2 = document.getElementById('referenceText2');
const referenceImage1 = document.getElementById('referenceImage1');
const referenceImage2 = document.getElementById('referenceImage2');
const language = document.getElementById('language');

const post = async () => {
  if (!postTitle.value || !text1.value || !text2.value || !language.value) {
    alert("missing feilds")
    return;
  }
  try {
    checkForToken();
    const response = await fetch(`http://localhost:3000/blog/`, {
      method: 'POST',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        heading: postTitle.value,
        text1: text1.value,
        text2: text2.value,
        referenceImage1: referenceImage1.value || "",
        referenceImage2: referenceImage2.value || "",
        referenceText1: referenceText1.value || "",
        referenceText2: referenceText2.value || "",
        language: language.value.toLowerCase()
      })
    })
    const responseJson = await response.json();
    if (responseJson.status) {
      alert("Posted");
      window.location.reload();
    }
    else {
      document.getElementById('loader').style.display = "none";
      alert(responseJson?.message)
    }
  }
  catch (error) {
    console.log(error)
  }
}
document.getElementById('submitForm').addEventListener("click", post);


// EDIT MODAL
const editPostTitle = document.getElementById('editPostTitle');
const editText1 = document.getElementById('editText1');
const editText2 = document.getElementById('editText2');
const editReferenceText1 = document.getElementById('editReferenceText1');
const editReferenceText2 = document.getElementById('editReferenceText2');
const editReferenceImage1 = document.getElementById('editReferenceImage1');
const editReferenceImage2 = document.getElementById('editReferenceImage2');
const editLanguage = document.getElementById('editLanguage');

const editPostHandler = async (id) => {
  checkForToken();

  document.getElementById("editModal").style.display = "flex";
  const response = await fetch(`http://localhost:3000/blog/singlePostById/${id}`);
  const responseJson = await response.json();
  const { heading, text1, text2, referenceImage1, referenceImage2, referenceText1, referenceText2, language } = responseJson.data
  editPostTitle.value = heading;
  editText1.value = text1;
  editText2.value = text2;
  editReferenceText1.value = referenceText1;
  editReferenceText2.value = referenceText2;
  editReferenceImage1.value = referenceImage1;
  editReferenceImage2.value = referenceImage2;
  editLanguage.value = language;

  document.getElementById('editSubmitForm').addEventListener("click", async () => {
    const response2 = await fetch(`http://localhost:3000/blog/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        heading: editPostTitle.value,
        text1: editText1.value,
        text2: editText2.value,
        referenceText1: editReferenceText1.value || "",
        referenceText2: editReferenceText2.value || "",
        referenceImage1: editReferenceImage1.value || "",
        referenceImage2: editReferenceImage2.value || "",
        language: editLanguage.value
      })
    })
    const responseJson2 = await response2.json();
    if (!responseJson2.status) {
      return alert("Something went wrong")
    }
    alert(responseJson2.message)
    window.location.reload();
  })
}


// SEARCH BY LANGUAGE
const inputLanguage = document.getElementById('dropDown');
inputLanguage.addEventListener("change", async () => {
  const response = await fetch(`http://localhost:3000/blog/postByLanguage/${inputLanguage.value}`);
  const responseJson = await response.json();
  if (responseJson.data.length == 0) {
    console.log("object")
    return document.getElementById('allpost').innerHTML = `<h1>No post found with language "${inputLanguage.value}"</h1>`
  }

  document.getElementById('allpost').innerHTML = "";
  responseJson.data.forEach((elem) => {
    document.getElementById('allpost').innerHTML += `
    <div class="post" id="${elem._id}">
          <div class="postTitle">
            <h3>${elem.heading}</h3>
            <div class="btnPost">
              <button class="editPost">Edit</button>
              <button class="deletePost">Delete</button>
            </div>
          </div>
        </div>`
  })
})

// DELETE A POST
const deletePost = async (id) => {
  checkForToken();
  let ask = confirm("Are you sure you want to delete a selected post");
  if (ask) {
    const response = await fetch(`http://localhost:3000/blog/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json'
      },
    });
    const responseJson = await response.json();
    if (responseJson.status) {
      window.location.reload()
    }
    else {
      alert(responseJson.message)
    }
  }
}

// LOGOUT
document.getElementById('btnLogout').addEventListener('click', () => {
  window.location.href = '../Login/loginAdmin.html';
})