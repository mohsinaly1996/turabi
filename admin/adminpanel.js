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

// POST MODAL OPEN
document.getElementById("openModal").addEventListener("click", () => {
  document.getElementById("myModal").style.display = "block";
});
