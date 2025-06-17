import {fetchWithToken} from "./api.js"

const overlay = document.getElementById("loading-overlay");
const errorText = document.getElementById("error-text");

document.getElementById("preferences-form").addEventListener("submit", async (e) => {
    e.preventDefault()

    overlay.style.display = "flex"; // block input

    const color = document.getElementById("color-input").value
    const favouriteImages = document.getElementById("favourite-api-input").value
    const email = document.getElementById("email-input").value

    fetchWithToken("http://localhost:8000/player/preferences", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            api: favouriteImages,
            color_found: color,
            color_closed: "#0ff"
        })
    }).then(preferencesResponse => {
        fetchWithToken("http://localhost:8000/player/email", {
            method: "put",
            body: JSON.stringify({
                email: email
            })
        }).then(emailResponse => {
            overlay.style.display = "none";

            if(preferencesResponse.status === 204 && emailResponse.status === 204) {
                errorText.textContent = "Voorkeuren gewijzigd!"
            }
        }).catch(() => {
            errorText.textContent = "Er is iets fout gegaan"
            overlay.style.display = "none";
        })
    }).catch(() => {
        errorText.textContent = "Er is iets fout gegaan"
        overlay.style.display = "none";
    })
})
