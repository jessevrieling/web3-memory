import {fetchWithToken} from "./api";

export async function getFavouriteImages() {
    const response = await fetchWithToken("http://localhost:8000/player/preferences", {
        method: "get",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const data = await response.json();
    return data.preferred_api;
}
