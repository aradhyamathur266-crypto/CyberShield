async function analyzePassword() {
    const password = document.getElementById("password").value;
    const result = document.getElementById("result");

    if (!password) {
        result.innerHTML = "Please enter a password.";
        return;
    }

    const response = await fetch("/analyze", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ password: password })
    });

    const data = await response.json();

    let percentage = (data.score / 5) * 100;

    result.innerHTML = `
        <div class="strength-bar">
            <div class="strength-fill" style="width: ${percentage}%"></div>
        </div>

        <div class="metric">
            <span>Strength</span>
            <strong>${data.strength}</strong>
        </div>

        <div class="metric">
            <span>Score</span>
            <strong>${data.score}/5</strong>
        </div>

        <div class="metric">
            <span>Entropy</span>
            <strong>${data.entropy} bits</strong>
        </div>

        <div class="metric">
            <span>Security Rating</span>
            <span class="rating-badge ${data.rating.toLowerCase().replace(" ", "-")}">
                ${data.rating}
            </span>
        </div>
    `;
}
async function generatePassword() {
    const length = document.getElementById("length").value;
    const generated = document.getElementById("generated");
    const copyBtn = document.getElementById("copyBtn");

    if (length < 8) {
        generated.innerHTML = "Password length must be at least 8.";
        copyBtn.style.display = "none";
        return;
    }

    const response = await fetch("/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ length: length })
    });

    const data = await response.json();

    if (data.error) {
        generated.innerHTML = data.error;
        copyBtn.style.display = "none";
    } else {
        generated.innerHTML = `
            <strong>Generated Password:</strong><br>
            ${data.password}
        `;

        copyBtn.style.display = "block";
        copyBtn.innerText = "📋 Copy Password";
    }
}


async function generateHash() {
    const text = document.getElementById("hashInput").value;
    const result = document.getElementById("hashResult");
    const copyBtn = document.getElementById("copyHashBtn");

    if (!text) {
        result.innerHTML = "Please enter some text.";
        copyBtn.style.display = "none";
        return;
    }

    const response = await fetch("/hash", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: text })
    });

    const data = await response.json();

    result.innerHTML = `
        <strong>SHA-256 Hash:</strong><br>
        ${data.hash}
    `;

    copyBtn.style.display = "block";
    copyBtn.innerText = "📋 Copy Hash";
}


function togglePassword() {
    const password = document.getElementById("password");

    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }
}
document.getElementById("toggleBtn").addEventListener("click", function () {
    const password = document.getElementById("password");

    if (password.type === "password") {
        password.type = "text";
        this.textContent = "🙈";
    } else {
        password.type = "password";
        this.textContent = "👁️";
    }
});

function copyPassword() {
    const generated = document.getElementById("generated");
    const password = generated.innerText.replace("Generated Password:", "").trim();

    navigator.clipboard.writeText(password);

    document.getElementById("copyBtn").innerText = "✅ Copied!";
}

function copyHash() {
    const hash = document.getElementById("hashResult").innerText
        .replace("SHA-256 Hash:", "")
        .trim();

    navigator.clipboard.writeText(hash);

    document.getElementById("copyHashBtn").innerText = "✅ Copied!";
}