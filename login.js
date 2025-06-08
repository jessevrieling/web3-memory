const overlay = document.getElementById("loading-overlay");

document.getElementById("register-form").addEventListener("submit", async function(e) {
    e.preventDefault();

    overlay.style.display = "flex"; // block input

    const username = document.getElementById("username-input").value
    const password = document.getElementById("password-input").value

    await sendCredentials(username, email, password)
})