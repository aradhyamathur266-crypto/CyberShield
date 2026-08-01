from flask import Flask, render_template, request, jsonify
from password_analyzer import analyze_password
from password_generator import generate_password
from hash_generator import hash_password

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/analyze", methods=["POST"])
def analyze():
    password = request.json["password"]

    strength, score, feedback, entropy, rating = analyze_password(password)

    return jsonify({
        "strength": strength,
        "score": score,
        "entropy": entropy,
        "rating": rating,
        "feedback": feedback
    })


@app.route("/generate", methods=["POST"])
def generate():
    length = int(request.json["length"])

    if length < 8:
        return jsonify({"error": "Password length must be at least 8."})

    password = generate_password(length)

    return jsonify({"password": password})


@app.route("/hash", methods=["POST"])
def hash_text():
    text = request.json["text"]

    hashed = hash_password(text)

    return jsonify({"hash": hashed})


if __name__ == "__main__":
    app.run(debug=True)