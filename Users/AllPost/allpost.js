let allpost = document.getElementById("allpost");

const getAllPost = async () => {
  try {
    const response = await fetch("http://localhost:3000/blog");
    const responseJson = await response.json();
    console.log(responseJson.data);
    let postData = [];
    responseJson.data.map((element) => {
      postData.push(`
          <div class="mainContent">
            <div class="content">
              <h1>${element.heading}</h1>
              <p>
                ${element.text}
              </p>
            </div>
            <div class="icon">
              <i class="fa-solid fa-angle-right"></i>
            </div>
          </div>`);
      return postData;
    });
    allpost.innerHTML = postData;
  } catch (error) {
    console.log(error);
  }
};
getAllPost();

const searchInput = document.getElementById("searchInput");
const getPostBySearch = async () => {
  try {
    const response = await fetch(
      `http://localhost:3000/blog/singlePost/${searchInput.value}`
    );
    const responseJson = await response.json();
    console.log(responseJson.data);
    let postData = [];
    responseJson.data.map((element) => {
      postData.push(`
              <div class="mainContent">
                <div class="content">
                  <h1>${element.heading}</h1>
                  <p>
                    ${element.text}
                  </p>
                </div>
                <div class="icon">
                  <i class="fa-solid fa-angle-right"></i>
                </div>
              </div>`);
      return postData;
    });
    allpost.innerHTML = postData;
  } catch (error) {
    console.log(error);
  }
};
searchInput.addEventListener("keydown",(e) => {
    if (e.key === 'Enter'){
       getPostBySearch();
    }
})
