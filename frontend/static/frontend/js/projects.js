document.addEventListener("DOMContentLoaded", function () {

    const token = localStorage.getItem("access");

    if (!token) {
        window.location.href = "/login/";
        return;
    }

    const table = document.getElementById("projectsTable");

    // =====================================
    // LOAD PROJECTS
    // =====================================
    function loadProjects() {

        table.innerHTML = "";

        fetch("/api/projects/projects/", {
            headers: { "Authorization": "Bearer " + token }
        })
        .then(res => res.json())
        .then(data => {

            data.forEach(project => {

                table.innerHTML += `
                    <tr>
                        <td>${project.name}</td>
                        <td>${project.difficulty}</td>
                        <td>
                            <select class="form-select status-select ${project.status}"
                                    data-id="${project.id}">
                                <option value="planned" ${project.status === "planned" ? "selected" : ""}>Planned</option>
                                <option value="in_progress" ${project.status === "in_progress" ? "selected" : ""}>In Progress</option>
                                <option value="completed" ${project.status === "completed" ? "selected" : ""}>Completed</option>
                            </select>
                        </td>
                    </tr>
                `;
            });

        });
    }

    loadProjects();

    // =====================================
    // ADD PROJECT
    // =====================================
    const addForm = document.getElementById("addProjectForm");

    if (addForm) {
        addForm.addEventListener("submit", function (e) {

            e.preventDefault();

            fetch("/api/projects/projects/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify({
                    name: document.getElementById("projectName").value,
                    description: document.getElementById("projectDescription").value || "",
                    difficulty: parseInt(document.getElementById("difficulty").value),
                    status: document.getElementById("status").value,
                    skills: []
                })
            })
            .then(res => res.json())
            .then(() => {
                addForm.reset();
                loadProjects();
            });
        });
    }

    // =====================================
    // UPDATE STATUS INLINE (NO RELOAD)
    // =====================================
    document.addEventListener("change", function (e) {

        if (e.target.classList.contains("status-select")) {

            const projectId = e.target.dataset.id;
            const newStatus = e.target.value;

            fetch(`/api/projects/projects/${projectId}/`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify({
                    status: newStatus
                })
            })
            .then(res => res.json())
            .then(() => {

                // Update color class instantly (no reload)
                e.target.className = "form-select status-select " + newStatus;

            });
        }
    });

});