let currentQuestionIndex = 0; // Start with the first question
let questions = [];
let answerDisplayed = false;

// Fetch questions from CSV file using PapaParse
function fetchQuestions() {
    Papa.parse('questions.csv', {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: function (results) {
            questions = results.data.sort((a, b) => a.QuestionNo - b.QuestionNo);
            displayQuestion();
        }
    });
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

// Display the next question in serial order
function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    }
}

// Display the previous question in serial order
function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', fetchQuestions);
