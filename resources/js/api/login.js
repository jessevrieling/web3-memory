const overlay = document.getElementById("loading-overlay");

document.getElementById("login-form").addEventListener("submit", async function(e) {
    e.preventDefault();

    overlay.style.display = "flex"; // block input

    const username = document.getElementById("username-input").value
    const password = document.getElementById("password-input").value

    await sendCredentials(username, password)
})

async function sendCredentials(username, password) {
    let messageText = document.getElementById("error-message");

    fetch("http://localhost:8000/memory/login", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    }).then(async response => {
        console.log(response)
        overlay.style.display = "none";

        if(response.ok) {
            await response.json().then(data => {
                localStorage.setItem("MEMORY_TOKEN", data.token)
            });

            window.location.replace("/memory");
        } else {
            messageText.innerHTML = "Onjuiste gebruikersnaam of wachtwoord"
        }
    }).catch(() => {messageText.innerHTML = "Onjuiste gebruikersnaam of wachtwoord"})
}
