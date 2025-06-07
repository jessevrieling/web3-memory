let submitButton = document.getElementById("submit-button");

submitButton.onclick(async () => {
    let username = document.getElementById("username-input").value
    let password = document.getElementById("password-input").value

    await sendCredentials(username, password)
});

async function sendCredentials(username, password) {
    fetch("localhost:8000/memory/register", {
        method: "post",

        body: JSON.stringify({
            username: username,
            password: password
        })
    }).then(response => console.log(response))
}
