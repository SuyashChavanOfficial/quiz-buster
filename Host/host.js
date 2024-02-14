let currentQuestionIndex = 0; // Start with the first question
let questions = [];

// Fetch questions from CSV file using PapaParse
function fetchQuestions() {
    Papa.parse('../questions.csv', {
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
    
    // Remove the previous answer element
    const previousAnswerElement = document.getElementById('answer');
    if (previousAnswerElement) {
        previousAnswerElement.remove();
    }

    questionElement.textContent = questions[currentQuestionIndex].Question;
    showAnswer();
}


function showAnswer() {
        const answer = questions[currentQuestionIndex].Answer;

        // Create a new h3 element for the answer
        const answerElement = document.createElement('h3');
        answerElement.id = 'answer';
        answerElement.textContent = `Answer: ${answer}`;

        // Apply styles and animations to the answer
        answerElement.style.color = 'white'; 
        answerElement.style.fontWeight = 'bold'; 
        answerElement.classList.add('answer-animation'); 
        // Append the answer below the question
        const questionContainer = document.getElementById('question-container');
        questionContainer.appendChild(answerElement);

        // Set answerDisplayed flag to true
        answerDisplayed = true;

        // Start the timer when the answer is displayed
        startTimer();
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
