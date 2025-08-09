import random
import time

# Choices with emojis
choices = {
    "rock": "🪨",
    "paper": "📄",
    "scissors": "✂️",
    "lizard": "🦎",
    "spock": "🖖"
}

# Rules of who beats who
winning_cases = {
    "rock": ["scissors", "lizard"],
    "paper": ["rock", "spock"],
    "scissors": ["paper", "lizard"],
    "lizard": ["spock", "paper"],
    "spock": ["scissors", "rock"]
}

# Computer personalities
computer_comments = {
    "win": [
        "Haha! 🤖 I am unbeatable!",
        "Too slow, human! 🏆",
        "Better luck next time! 😎",
        "Yay! My circuits are happy 🤩"
    ],
    "lose": [
        "Nooo! My CPU hurts 😭",
        "Impossible… did you hack me? 😱",
        "You got lucky this time, human… 😤",
        "I'll get you next round! 💪"
    ],
    "tie": [
        "A tie? Boring… 😐",
        "Great minds think alike! 🧠",
        "We are evenly matched! ⚖️",
        "Draw! Let's go again! 🔄"
    ]
}

player_score = 0
computer_score = 0

print("🎮 Welcome to Rock 🪨 Paper 📄 Scissors ✂️ Lizard 🦎 Spock 🖖")
print("Type 'exit' to quit the game.\n")

while True:
    print("\nChoose your move: ")
    for name, emoji in choices.items():
        print(f"- {name} {emoji}")

    player = input("\n👉 Your choice: ").lower().strip()

    if player == "exit":
        print("\n🏁 Final Score:")
        print(f"😎 You: {player_score} | 🤖 Computer: {computer_score}")
        print("Thanks for playing! 🎉")
        break

    if player not in choices:
        print("❌ Invalid choice! Try again.")
        continue

    # Computer picks randomly
    computer = random.choice(list(choices.keys()))

    # Dramatic reveal
    print("\n🤖 Thinking...")
    time.sleep(1)
    print(f"🤖 Computer chose: {choices[computer]}")
    print(f"😎 You chose: {choices[player]}")

    # Determine winner
    if player == computer:
        print("⚖️ It's a tie!")
        print(random.choice(computer_comments["tie"]))
    elif computer in winning_cases[player]:
        print("✅ You win this round!")
        player_score += 1
        print(random.choice(computer_comments["lose"]))
    else:
        print("❌ You lose this round!")
        computer_score += 1
        print(random.choice(computer_comments["win"]))

    print(f"🏆 Score — You: {player_score} | Computer: {computer_score}")
