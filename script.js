let currentQuestionIndex = 0; // Start with the first question
let questions = [];
let answerDisplayed = false;
let timerInterval;

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

    // Remove any previously displayed answer and reset the timer
    hideAnswer();
    resetTimer();
}

// Display the answer to the current question below the question
function showAnswer() {
    const answerContainer = document.getElementById('answer-container');
    answerContainer.innerHTML = ''; // Clear previous answers
    
    const answer = questions[currentQuestionIndex].Answer;

    // Create a new h3 element for the answer
    const answerElement = document.createElement('h3');
    answerElement.id = 'answer';
    answerElement.textContent = `Answer: ${answer}`;

    // Apply styles and animations to the answer
    answerElement.style.color = 'black';
    answerElement.style.backgroundColor = 'rgb(244, 236, 13)';
    answerElement.style.fontWeight = 'bold';
    answerElement.style.padding = '5px';
    answerElement.style.borderRadius = '20px';
    answerElement.classList.add('answer-animation');

    // Append the answer to the answer container
    answerContainer.appendChild(answerElement);
    
    // Set answerDisplayed flag to true
    answerDisplayed = true;

    // Start the timer when the answer is displayed
    startTimer();
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

// Start the timer countdown
function startTimer() {
    resetTimer();

    let seconds = 30;
    const timerElement = document.getElementById('timer');

    timerInterval = setInterval(function () {
        seconds--;

        // Display the timer value with 2 digits
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
        timerElement.textContent = formattedSeconds;

        // Update styles based on seconds
        updateTimerStyles(seconds);

        // Check if the timer reaches 0
        if (seconds === 0) {
            clearInterval(timerInterval);
            timerElement.classList.add('blink'); // Add a class for blinking effect
        }
    }, 1000);
}

// Update timer styles based on seconds
function updateTimerStyles(seconds) {
    const timerElement = document.getElementById('timer');
    if (seconds > 20) {
        timerElement.style.backgroundColor = 'green';
        timerElement.style.color = 'white'; // Set text color to white
    } else if (seconds > 10) {
        timerElement.style.backgroundColor = 'yellow';
        timerElement.style.color = 'black'; // Set text color to black
    } else {
        timerElement.style.backgroundColor = 'red';
        timerElement.style.color = 'white'; // Set text color to white
    }
}

// Reset the timer
function resetTimer() {
    clearInterval(timerInterval);
    const timerElement = document.getElementById('timer');
    timerElement.textContent = '30';
    timerElement.style.backgroundColor = 'green'; // Reset background color
    timerElement.style.color = ''; // Reset text color
    timerElement.classList.remove('blink'); // Remove the blinking effect class
}

// Initialize the page
document.addEventListener('DOMContentLoaded', fetchQuestions);
