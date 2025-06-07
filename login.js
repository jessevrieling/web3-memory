document.getElementById("login-form").addEventListener("submit", async function(e) {
    e.preventDefault();

    if(!e.target.reportValidity()) {
        return;
    }

    const username = document.getElementById("username-input").value
    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value

    await sendCredentials(username, email, password)
})

async function sendCredentials(username, email, password) {
    fetch("http://localhost:8000/memory/register", {
        method: "post",

        body: JSON.stringify({
            username: username,
            email: email,
            password: password
        })
    }).then(response => console.log(response))
}
