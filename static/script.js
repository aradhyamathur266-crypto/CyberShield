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

    result.innerHTML = `
        <strong>Strength:</strong> ${data.strength}<br>
        <strong>Score:</strong> ${data.score}/5<br>
        <strong>Entropy:</strong> ${data.entropy} bits<br>
        <strong>Security Rating:</strong> ${data.rating}
    `;
}


async function generatePassword() {
    const length = document.getElementById("length").value;
    const generated = document.getElementById("generated");

    if (length < 8) {
        generated.innerHTML = "Password length must be at least 8.";
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
    } else {
        generated.innerHTML = `
            <strong>Generated Password:</strong><br>
            ${data.password}
        `;
    }
}


async function generateHash() {
    const text = document.getElementById("hashInput").value;
    const result = document.getElementById("hashResult");

    if (!text) {
        result.innerHTML = "Please enter some text.";
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
}