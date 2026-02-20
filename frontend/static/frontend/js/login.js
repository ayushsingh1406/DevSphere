document.addEventListener("DOMContentLoaded", function () {

    const recentUsername = localStorage.getItem("recent_username");

    if (recentUsername) {
        document.getElementById("username").value = recentUsername;
        localStorage.removeItem("recent_username");
    }

    document.getElementById("loginForm").addEventListener("submit", function(e) {
        e.preventDefault();

        fetch("/api/token/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: document.getElementById("username").value,
                password: document.getElementById("password").value
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.access) {
                localStorage.setItem("access", data.access);
                window.location.href = "/dashboard/";
            } else {
                document.getElementById("error").innerText = "Invalid credentials";
            }
        });
    });

});
