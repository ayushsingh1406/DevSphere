document.addEventListener("DOMContentLoaded", function () {

    const token = localStorage.getItem("access");

    if (!token) {
        window.location.href = "/login/";
        return;
    }

    fetch("/api/accounts/profile/", {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("username").value = data.username;
        document.getElementById("email").value = data.email;
        document.getElementById("experience_years").value = data.experience_years;
    });

});

function updateProfile() {

    const token = localStorage.getItem("access");

    fetch("/api/accounts/profile/", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
            experience_years: document.getElementById("experience_years").value
        })
    })
    .then(res => res.json())
    .then(() => {
        alert("Profile updated successfully!");
        location.reload();
    });

}
