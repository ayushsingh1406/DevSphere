document.addEventListener("DOMContentLoaded", function () {

    const token = localStorage.getItem("access");

    if (!token) {
        window.location.href = "/login/";
        return;
    }

    // Load user skills
    fetch("/api/skills/user-skills/", {
        headers: { "Authorization": "Bearer " + token }
    })
        .then(res => res.json())
        .then(data => {

            const table = document.getElementById("skillsTable");

            data.forEach(item => {
                table.innerHTML += `
                <tr>
                    <td>${item.skill_detail.name}</td>
                    <td>${item.proficiency}</td>
                    <td>${item.practice_hours}</td>
                </tr>
            `;
            });
        });

    // Add new skill
    document.getElementById("addSkillForm").addEventListener("submit", function (e) {
        e.preventDefault();

        fetch("/api/skills/skills/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                name: document.getElementById("skillName").value,
                category: document.getElementById("skillCategory").value
            })
        })
            .then(res => res.json())
            .then(skill => {

                fetch("/api/skills/user-skills/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token
                    },
                    body: JSON.stringify({
                        skill: skill.id,
                        proficiency: document.getElementById("proficiency").value
                    })
                })
                    .then(() => location.reload());
            });

    });

});