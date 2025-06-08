const overlay = document.getElementById("loading-overlay");

document.getElementById("register-form").addEventListener("submit", async function(e) {
    e.preventDefault();

    overlay.style.display = "flex"; // block input

    const username = document.getElementById("username-input").value
    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value

    await sendCredentials(username, email, password)
})

async function sendCredentials(username, email, password) {
    let messageText = document.getElementById("register-message");

    fetch("http://localhost:8000/memory/register", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password
        })
    }).then(response => {
        overlay.style.display = "none";

        messageText.innerHTML = "Account aangemaakt!"
    }).catch(() => {messageText.innerHTML = "Er is een probleem opgetreden"})
}
