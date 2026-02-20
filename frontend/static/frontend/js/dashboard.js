document.addEventListener("DOMContentLoaded", function () {

    const token = localStorage.getItem("access");

    if (!token) {
        window.location.href = "/login/";
        return;
    }

    // =====================================
    // ANIMATED COUNTER FUNCTION
    // =====================================
    function animateValue(elementId, endValue, duration = 800) {

        const element = document.getElementById(elementId);
        if (!element) return;

        let start = 0;
        const increment = endValue / (duration / 16);

        function update() {
            start += increment;

            if (start < endValue) {
                element.innerText = Number.isInteger(endValue)
                    ? Math.floor(start)
                    : start.toFixed(1);

                requestAnimationFrame(update);
            } else {
                element.innerText = endValue;
            }
        }

        update();
    }

    // =====================================
    // DASHBOARD ANALYTICS
    // =====================================
    fetch("/api/analytics/dashboard/", {
        headers: { "Authorization": "Bearer " + token }
    })
    .then(res => res.json())
    .then(data => {

        // Animated KPIs
        animateValue("dev_score", data.dev_score);
        animateValue("total_hours", data.total_practice_hours);
        animateValue("total_skills", data.total_skills);
        animateValue("completed_projects", data.completed_projects);
        animateValue("avg_difficulty", data.average_project_difficulty);

        // Skill Intelligence
        const strongest = document.getElementById("strongest_skill");
        const weakest = document.getElementById("weakest_skill");

        if (strongest) strongest.innerText = data.strongest_skill || "-";
        if (weakest) weakest.innerText = data.weakest_skill || "-";

        // Level System
        const level = document.getElementById("dev_level");
        if (level) level.innerText = data.level;

        const progressBar = document.getElementById("level_progress_bar");
        if (progressBar) {
            progressBar.style.width = data.level_progress + "%";
        }
    });

    // =====================================
    // LOAD SKILL DROPDOWN
    // =====================================
    fetch("/api/skills/skills/", {
        headers: { "Authorization": "Bearer " + token }
    })
    .then(res => res.json())
    .then(data => {

        const select = document.getElementById("skillSelect");
        if (!select) return;

        select.innerHTML = '<option value="">Select Skill</option>';

        data.forEach(skill => {
            select.innerHTML +=
                `<option value="${skill.id}">${skill.name}</option>`;
        });
    });

    // =====================================
    // LOAD USER SKILLS + CHART
    // =====================================
    fetch("/api/skills/user-skills/", {
        headers: { "Authorization": "Bearer " + token }
    })
    .then(res => res.json())
    .then(data => {

        const table = document.getElementById("skillsTable");
        if (table) table.innerHTML = "";

        const labels = [];
        const hours = [];

        data.forEach(item => {

            if (table) {
                table.innerHTML += `
                    <tr>
                        <td>${item.skill_detail.name}</td>
                        <td>${item.proficiency}</td>
                        <td>${item.practice_hours}</td>
                    </tr>
                `;
            }

            labels.push(item.skill_detail.name);
            hours.push(item.practice_hours);
        });

        const chartCanvas = document.getElementById("skillChart");

        if (chartCanvas) {
            new Chart(chartCanvas, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Practice Hours',
                        data: hours
                    }]
                }
            });
        }
    });

    // =====================================
    // PRACTICE FORM
    // =====================================
    const practiceForm = document.getElementById("practiceForm");

    if (practiceForm) {
        practiceForm.addEventListener("submit", function (e) {
            e.preventDefault();

            fetch("/api/analytics/practice/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify({
                    skill: document.getElementById("skillSelect").value,
                    hours: document.getElementById("hours").value
                })
            })
            .then(res => res.json())
            .then(() => location.reload());
        });
    }

});


// =====================================
// DELETE ACCOUNT
// =====================================
function deleteAccount() {

    const token = localStorage.getItem("access");

    const confirmDelete =
        confirm("Are you sure? This action cannot be undone.");

    if (!confirmDelete) return;

    fetch("/api/accounts/delete/", {
        method: "DELETE",
        headers: { "Authorization": "Bearer " + token }
    })
    .then(res => {
        if (res.status === 204) {
            alert("Account deleted successfully.");
            localStorage.removeItem("access");
            window.location.href = "/register/";
        }
    });
}

