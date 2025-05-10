async function apicall() {
  try {
    const blogapi = await fetch("http://localhost:3000/blog");
    const blogapicall = await blogapi.json();
  } catch (error) {
    console.log(error);
  }
}

api = "https://api.cloudinary.com/v1_1/acitTURABI/image/upload";

let fileInput = media_file.files[0];
const fileType = fileInput.name.split(".")[1];
const formData = new FormData();
formData.append("file", fileInput);
formData.append(
  "upload_preset",
  "https://api.cloudinary.com/v1_1/acitTURABI/image/upload"
);
if (
  fileType == "jpg" ||
  fileType == "png" ||
  fileType == "gif" ||
  fileType == "jpeg"
) {
  formData.append("folder", "Blogs/Pics");
  const blogPostUrl = await fetch(
    "https://api.cloudinary.com/v1_1/acitTURABI/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );
  blogImgURL = await blogPostUrl.json();
}
