document.addEventListener("DOMContentLoaded", function () {

    const token = localStorage.getItem("access");

    if (!token) {
        window.location.href = "/login/";
        return;
    }

    fetch("/api/analytics/leaderboard/", {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    .then(res => {
        if (res.status === 401) {
            window.location.href = "/login/";
            return;
        }
        return res.json();
    })
    .then(data => {

        const body = document.getElementById("leaderboardBody");

        if (!body || !data) return;

        data.forEach(user => {
            body.innerHTML += `
                <tr>
                    <td>${user.rank}</td>
                    <td>${user.username}</td>
                    <td>${user.dev_score}</td>
                    <td>${user.experience_years}</td>
                </tr>
            `;
        });

    })
    .catch(error => {
        console.error("Leaderboard load error:", error);
    });

});
