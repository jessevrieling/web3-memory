export function fetchWithToken(url, init = {}) {
    const token = localStorage.getItem("MEMORY_TOKEN");
    const authHeader = { "Authorization": `Bearer ${token}` };

    fetch("http://localhost:8000/player", {
        headers: authHeader
    }).then((response) => {
        if(response.status === 401) {
            alert("Sessie verlopen, log opnieuw in")
            window.location.replace("/login");
        }
    })

    init.headers = {
        ...(init.headers || {}),
        ...authHeader
    };

    return fetch(url, init);
}
