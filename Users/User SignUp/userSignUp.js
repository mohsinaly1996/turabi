// EYE BUTTON TOGGLEs
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

togglePassword.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    togglePassword.classList.toggle('fa-eye');
    togglePassword.classList.toggle('fa-eye-slash');
});


// SIGNUP HANDLER
const name = document.getElementById('name')
const userName = document.getElementById('userName');
const email = document.getElementById('email')
const phone = document.getElementById('phone')
const password = document.getElementById('password')

const signUpHandler = async (e) => {
    e.preventDefault()
    if (!name || !userName || !email || !phone || !password) {
        return alert("required email and password");
    }
    if (!email.value.includes("@")) {
        return alert("Invalid Email");
    }

    try {
        const response = await fetch('http://localhost:3000/auth/signup', {
            method: 'POST',
            headers: {
                Accept: 'application.json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name.value,
                userName: userName.value,
                password: password.value,
                email: email.value,
                phone: phone.value
            })
        })
        const feed = await response.json();
        if (!feed.status) {
            alert(feed.message || "SignUp failed");
        }
        else {
            localStorage.setItem('token', feed.data);
            alert("Registered successfully");
            setTimeout(() => {
                window.location.href = '../User Login/userLogin.html';
            }, 1000);
        }
    }
    catch (e) {
        alert(e);
    }
}

document.getElementById('submitbtn').addEventListener("click", signUpHandler)