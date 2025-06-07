let submitButton = document.getElementById("submit-button");

submitButton.onclick(() => {
    let username = document.getElementById("username-input").value
    let password = document.getElementById("password-input").value

    sendCredentials(username, password).then(response => console.log(response))
});

async function sendCredentials(username, password) {

}
