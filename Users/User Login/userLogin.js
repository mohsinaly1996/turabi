const email = document.getElementById('email');
const password = document.getElementById('password');

const loginHandler = async (e) => {
    e.preventDefault()
    if (!email || !password) {
        return alert("required email and password");
    }
    try {
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
            alert(feed.message || "Login failed");
        }
        else {
            localStorage.setItem('token', feed.data);
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 1000);
        }
    }
    catch (e) {
        alert(e);
    }
}

document.getElementById('submitbtn').addEventListener("click", loginHandler)