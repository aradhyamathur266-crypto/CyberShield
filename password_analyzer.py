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

import math

def calculate_entropy(password):
    charset = 0

    if any(c.islower() for c in password):
        charset += 26

    if any(c.isupper() for c in password):
        charset += 26

    if any(c.isdigit() for c in password):
        charset += 10

    if any(not c.isalnum() for c in password):
        charset += 32

    if charset == 0:
        return 0

    return round(len(password) * math.log2(charset), 2)

def get_security_rating(entropy):
    if entropy < 28:
        return "Very Weak"
    elif entropy < 36:
        return "Weak"
    elif entropy < 60:
        return "Moderate"
    elif entropy < 80:
        return "Strong"
    else:
        return "Very Strong"
    
def analyze_password(password):
    score = 0
    feedback = []

    if password.lower() in COMMON_PASSWORDS:
        feedback.append("This is a commonly used password.")
        score = 0
        return "Very Weak", score, feedback, 0, "Very Weak"

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

    entropy = calculate_entropy(password)
    rating = get_security_rating(entropy)

    return strength, score, feedback, entropy, rating