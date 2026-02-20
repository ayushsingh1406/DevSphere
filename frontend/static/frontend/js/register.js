document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("registerForm");
    const messageDiv = document.getElementById("message");

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        messageDiv.innerHTML = "";

        fetch("/api/accounts/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        })
        .then(async res => {
            const data = await res.json();

            if (res.status === 201) {

                // Save username temporarily for login autofill
                localStorage.setItem("recent_username", username);

                messageDiv.innerHTML = `
                    <div class="alert alert-success">
                        Registration successful! Redirecting to login...
                    </div>
                `;

                setTimeout(function() {
                    window.location.href = "/login/";
                }, 2000);
                
            } else {

                let errorMessage = "";

                for (const key in data) {
                    errorMessage += data[key].join(", ") + "<br>";
                }

                messageDiv.innerHTML = `
                    <div class="alert alert-danger">
                        ${errorMessage}
                    </div>
                `;
            }
        })
        .catch(error => {
            messageDiv.innerHTML = `
                <div class="alert alert-danger">
                    Network error. Try again.
                </div>
            `;
        });

    });

});