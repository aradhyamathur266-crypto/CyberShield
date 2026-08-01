from password_analyzer import analyze_password
from password_generator import generate_password
from hash_generator import hash_password


while True:
    print("\n=== CyberShield ===")
    print("1. Analyze Password")
    print("2. Generate Password")
    print("3. Hash Password")
    print("4. Exit")

    choice = input("\nChoose an option: ")

    if choice == "1":
        password = input("\nEnter a password: ")

        strength, score, feedback, entropy, rating = analyze_password(password)

        print(f"\nStrength: {strength}")
        print(f"Score: {score}/5")
        print(f"Entropy: {entropy} bits")
        print(f"Security Rating: {rating}")

        if feedback:
            print("\nSuggestions:")
            for item in feedback:
                print(f"- {item}")
        else:
            print("\nYour password meets all basic security checks!")

    elif choice == "2":
        length = int(input("\nEnter password length: "))

        if length < 8:
            print("\nPassword length must be at least 8 characters.")
        else:
            password = generate_password(length)
            print(f"\nGenerated Password: {password}")

        
    elif choice == "3":
        password = input("\nEnter password: ")
        hashed = hash_password(password)

        print("\nSHA-256 Hash:")
        print(hashed)

    elif choice == "4":
        print("\nExiting CyberShield...")
        break

    else:
        print("\nInvalid option. Please choose 1-4.")