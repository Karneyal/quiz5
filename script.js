// Questions, Options, and Clues
const questions = [
    {
        question: "How many books are in the Bible?(బైబిల్‌లో ఎన్ని పుస్తకాలు ఉన్నాయి?)",
        options: ["60", "64", "66", "70"],
        answer: "66",
        clue: "Clue: I sit at the door, where greetings begin, Welcoming all with a smile and a cheer."
    },
    {
        question: "True or False: Jesus was an only child.(నిజం లేదా అబద్ధం: యేసు ఒక్కడే సంతానం.)",
        options: ["True నిజమే", "False అబద్ధం",],
        answer: "False అబద్ధం",
        clue: "Clue: I sit at the door, where greetings begin, Welcoming all with a smile and a cheer."
    },
    {
        question: "When David wanted to fight Goliath, what did Saul try to give him?(దావీదు గొల్యాతుతో పోరాడాలనుకున్నప్పుడు, సౌలు అతనికి ఏమి ఇవ్వడానికి ప్రయత్నించాడు?)",
        options: ["His sword తన కత్తి", "His armour తన కవచం", "His crown తన కిరీటం", "His shield తన కవచం"],
        answer: "His armour తన కవచం",
        clue: "Clue: I sit at the door, where greetings begin, Welcoming all with a smile and a cheer."
    },
    

];

let currentQuestionIndex = 0;
let wrongAttempts = 0;

// Load a question and display options
function loadQuestion() {
    document.getElementById("question").innerText = questions[currentQuestionIndex].question;
    let optionsHtml = "";
    questions[currentQuestionIndex].options.forEach((option, index) => {
        optionsHtml += `
            <div class="form-check">
                <input class="form-check-input" type="radio" name="option" id="option${index}" value="${option}">
                <label class="form-check-label" for="option${index}">
                    ${option}
                </label>
            </div>
        `;
    });
    document.getElementById("options").innerHTML = optionsHtml;
    document.getElementById("clue").innerText = ""; // Clear previous clue
    document.getElementById("submitBtn").classList.remove("d-none"); // Show submit button
}

// Check if the selected answer is correct
function checkAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
        const userAnswer = selectedOption.value;
        const correctAnswer = questions[currentQuestionIndex].answer;

        if (userAnswer === correctAnswer) {
            // Show the clue and end the quiz
            document.getElementById("clue").innerText = questions[currentQuestionIndex].clue; // Show clue
            document.getElementById("submitBtn").classList.add("d-none"); // Hide submit button after correct answer
        } else {
            // Keep asking until the answer is correct (without clue)
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                loadQuestion(); // Load next question if there are more
            } else {
                disqualifyUser(); // Disqualify after 5 wrong attempts
            }
        }
    } else {
        alert("Please select an answer!");
    }
}

// Show the disqualified message
function disqualifyUser() {
    document.getElementById("quiz-box").classList.add("d-none");
    document.getElementById("disqualified").classList.remove("d-none");
}

// Restart the quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    wrongAttempts = 0;
    document.getElementById("disqualified").classList.add("d-none");
    document.getElementById("quiz-box").classList.remove("d-none");
    loadQuestion();
}

// Load the first question on page load
window.onload = loadQuestion;
