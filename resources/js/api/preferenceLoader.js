import {fetchWithToken} from "./api.js"

export async function getFavouriteImages() {
    await fetchWithToken("http://localhost:8000/player/preferences", {
        method: "get",
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => response.json()).then((data) => {
        return data.preffered_api
    })
}