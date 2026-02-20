document.addEventListener("DOMContentLoaded", function () {

    const token = localStorage.getItem("access");

    if (!token) {
        window.location.href = "/login/";
        return;
    }

    const table = document.getElementById("adminUsersTable");

    fetch("/api/accounts/profile/", {
        headers: { "Authorization": "Bearer " + token }
    })
    .then(res => res.json())
    .then(user => {

        if (!user.is_staff && !user.is_superuser) {
            alert("Access denied.");
            window.location.href = "/dashboard/";
            return;
        }

        loadUsers();
    });

    function loadUsers() {

        table.innerHTML = "";

        fetch("/api/accounts/admin/users/", {
            headers: { "Authorization": "Bearer " + token }
        })
        .then(res => res.json())
        .then(users => {

            users.forEach(user => {

                table.innerHTML += `
                    <tr>
                        <td>${user.username}</td>
                        <td>${user.email}</td>
                        <td>
                            <input type="number" class="form-control exp-input"
                                data-id="${user.id}"
                                value="${user.experience_years}">
                        </td>
                        <td>
                            <input type="text" class="form-control github-input"
                                data-id="${user.id}"
                                value="${user.github_username || ''}">
                        </td>
                        <td>${user.dev_score}</td>
                        <td>
                            <button class="btn btn-sm btn-danger delete-btn"
                                data-id="${user.id}">
                                Delete
                            </button>
                        </td>
                    </tr>
                `;
            });
        });
    }

    // Update experience or github
    document.addEventListener("change", function (e) {

        if (e.target.classList.contains("exp-input") ||
            e.target.classList.contains("github-input")) {

            const userId = e.target.dataset.id;

            const row = e.target.closest("tr");

            const experience = row.querySelector(".exp-input").value;
            const github = row.querySelector(".github-input").value;

            fetch(`/api/accounts/admin/users/${userId}/`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify({
                    experience_years: experience,
                    github_username: github
                })
            })
            .then(res => res.json())
            .then(() => console.log("User updated"));
        }
    });

    // Delete user
    document.addEventListener("click", function (e) {

        if (e.target.classList.contains("delete-btn")) {

            const userId = e.target.dataset.id;

            if (!confirm("Delete this user?")) return;

            fetch(`/api/accounts/admin/users/${userId}/delete/`, {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
            .then(res => {
                if (res.status === 204) {
                    loadUsers();
                } else {
                    alert("Cannot delete this user.");
                }
            });
        }
    });

});