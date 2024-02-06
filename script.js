let currentQuestionIndex = -1;
let questions = [];
let usedQuestions = [];
let answerDisplayed = false;

// Fetch questions from CSV file using PapaParse
function fetchQuestions() {
    Papa.parse('questions.csv', {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: function (results) {
            questions = results.data;
            nextQuestion();
        }
    });
}

// Display a random question
function nextQuestion() {
    if (usedQuestions.length === questions.length) {
        // All questions have been used, reset the usedQuestions array
        usedQuestions = [];
    }

    // Get a random index that hasn't been used yet
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * questions.length);
    } while (usedQuestions.includes(randomIndex));

    // Update currentQuestionIndex and usedQuestions array
    currentQuestionIndex = randomIndex;
    usedQuestions.push(randomIndex);

    // Reset answerDisplayed flag
    answerDisplayed = false;

    // Display the random question
    displayQuestion();
}

// Display the current question
function displayQuestion() {
    const questionElement = document.getElementById('question');
    questionElement.textContent = questions[currentQuestionIndex].Question;

    // Remove any previously displayed answer
    hideAnswer();
}

// Display the answer to the current question below the question
function showAnswer() {
    if (!answerDisplayed) {
        const answer = questions[currentQuestionIndex].Answer;

        // Create a new h3 element for the answer
        const answerElement = document.createElement('h3');
        answerElement.id = 'answer';
        answerElement.textContent = `Answer: ${answer}`;

        // Apply styles and animations to the answer
        answerElement.style.color = '#0066cc'; // Change the color to blue
        answerElement.style.fontWeight = 'bold'; // Make it bold
        answerElement.classList.add('answer-animation'); // Add a CSS class for animations

        // Append the answer below the question
        const questionContainer = document.getElementById('question-container');
        questionContainer.appendChild(answerElement);

        // Set answerDisplayed flag to true
        answerDisplayed = true;
    }
}

// Hide the answer for the current question
function hideAnswer() {
    const answerElement = document.getElementById('answer');
    if (answerElement) {
        answerElement.parentNode.removeChild(answerElement);
        answerDisplayed = false;
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', fetchQuestions);
