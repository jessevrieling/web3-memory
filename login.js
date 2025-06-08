const overlay = document.getElementById("loading-overlay");

document.getElementById("register-form").addEventListener("submit", async function(e) {
    e.preventDefault();

    overlay.style.display = "flex"; // block input

    const username = document.getElementById("username-input").value
    const password = document.getElementById("password-input").value

    await sendCredentials(username, password)
})

async function sendCredentials(username, password) {
    let messageText = document.getElementById("register-message");

    fetch("http://localhost:8000/memory/register", {
        method: "post",

        body: JSON.stringify({
            username: username,
            password: password
        })
    }).then(response => {
        console.log(response)
        overlay.style.display = "none";

        window.location.replace("/");
    }).catch(() => {messageText.innerHTML = "Onjuiste gebruikersnaam of wachtwoord"})
}