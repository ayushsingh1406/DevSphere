document.addEventListener("DOMContentLoaded", function () {

    const token = localStorage.getItem("access");

    // Redirect unauthenticated users
    const currentPath = window.location.pathname;

    if (!token && !currentPath.includes("/login") && !currentPath.includes("/register")) {
        window.location.href = "/login/";
    }

});

function logout() {
    localStorage.removeItem("access");
    window.location.href = "/login/";
}
