document.getElementById("login-form").addEventListener("submit", async function(e) {
    e.preventDefault();

    const username = document.getElementById("username-input").value
    const password = document.getElementById("password-input").value
    console.log("test")

    await sendCredentials(username, password)
})

async function sendCredentials(username, password) {
    fetch("localhost:8000/memory/register", {
        method: "post",

        body: JSON.stringify({
            username: username,
            password: password
        })
    }).then(response => console.log(response))
}
