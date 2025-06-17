export function fetchWithToken(url, init = {}) {
    const token = localStorage.getItem("MEMORY_TOKEN");
    const authHeader = { "Authorization": `Bearer ${token}` };

    init.headers = {
        ...(init.headers || {}),
        ...authHeader
    };

    return fetch(url, init);
}
