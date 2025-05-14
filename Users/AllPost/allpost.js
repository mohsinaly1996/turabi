let allpost = document.getElementById("allpost");

const getAllPost = async () => {
  allpost.innerHTML = ""
  try {
    const response = await fetch("http://localhost:3000/blog");
    const responseJson = await response.json();
    if (!responseJson.status) {
      postData.push(`<h1>${responseJson.message}</h1>`);
      allpost.innerHTML = postData;
      return;
    }
    responseJson.data.forEach((element) => {
      allpost.innerHTML += `
          <div class="mainContent">
            <div class="content">
              <h1>${element.heading}</h1>
            </div>
            <div class="icon">
              <i class="fa-solid fa-angle-right"></i>
            </div>
          </div>`
    });
  }
  catch (error) {
    console.log(error);
  }
};
getAllPost();

const searchInput = document.getElementById("searchInput");
const getPostBySearch = async () => {
  allpost.innerHTML = "";
  try {
    const response = await fetch(
      `http://localhost:3000/blog/singlePost/${searchInput.value}`
    );
    const responseJson = await response.json();
    if (!responseJson.status) {
      postData.push(`<p>${responseJson.message} with word <strong> "${searchInput.value}"</strong></p>`);
      allpost.innerHTML = postData;
      return;
    }
    responseJson.data.map((element) => {
      allpost.innerHTML += `
              <div class="mainContent">
                <div class="content">
                  <h1>${element.heading}</h1>
                </div>
                <div class="icon">
                  <i class="fa-solid fa-angle-right"></i>
                </div>
              </div>`
    });
  }
  catch (error) {
    console.log(error);
  }
};

searchInput.addEventListener("keydown", (e) => {
  if (e.key === 'Enter') {
    getPostBySearch();
  }
})
