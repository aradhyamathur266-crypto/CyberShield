import re

COMMON_PASSWORDS = [
    "123456",
    "password",
    "12345678",
    "qwerty",
    "admin",
    "letmein",
    "welcome"
]

def analyze_password(password):
    score = 0
    feedback = []

    if password.lower() in COMMON_PASSWORDS:
        feedback.append("This is a commonly used password.")
        score = 0
        return "Very Weak", score, feedback

    if len(password) >= 8:
        score += 1
    else:
        feedback.append("Use at least 8 characters.")

    if re.search(r"[A-Z]", password):
        score += 1
    else:
        feedback.append("Add an uppercase letter.")

    if re.search(r"[a-z]", password):
        score += 1
    else:
        feedback.append("Add a lowercase letter.")

    if re.search(r"\d", password):
        score += 1
    else:
        feedback.append("Add a number.")

    if re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
        score += 1
    else:
        feedback.append("Add a special character.")

    if score <= 2:
        strength = "Weak"
    elif score <= 4:
        strength = "Medium"
    else:
        strength = "Strong"

    return strength, score, feedback