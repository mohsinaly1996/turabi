// EYE TOOGLE
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

togglePassword.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    togglePassword.classList.toggle('fa-eye');
    togglePassword.classList.toggle('fa-eye-slash');
});


// LOGIN HANNDLER
const email = document.getElementById('email');
const login = async (e) => {
    e.preventDefault();
    const isAdmin = await fetch(`http://localhost:3000/user/${email.value}`);
    const isAdminJson = await isAdmin.json();
    if (!isAdminJson.data.admin) {
        return alert("You Can't login");
    }
    const response = await fetch('http://localhost:3000/auth/signin', {
        method: 'POST',
        headers: {
            Accept: 'application.json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email.value,
            password: password.value
        })
    })
    const feed = await response.json();
    if (!feed.status) {
        return alert("Invalid user name or Password");
    }
    localStorage.setItem('token', feed.data)
    window.location.href = '../Admin Panel/adminPanel.html'
}
document.getElementById('submitbtn').addEventListener("click", login);