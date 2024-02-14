let currentQuestionIndex = 0; // Start with the first question
let questions = [];
let answerDisplayed = false;
let timerInterval;
let audio = new Audio('timer.mp3');
let isAudioPlaying = false;
let currentTimerValue = 30; // Initial timer value

audio.addEventListener('ended', function() {
    isAudioPlaying = false;
});

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
    playAudio();

    let seconds = 30; // Set timer duration to match audio duration
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


// Stop the timer and store the current timer value
function stopTimer() {
    clearInterval(timerInterval);
    const timerElement = document.getElementById('timer');
    currentTimerValue = parseInt(timerElement.textContent); // Store the current timer value
    stopAudio();
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

// Reset the timer with the stored value
function resetTimer() {
    const timerElement = document.getElementById('timer');
    timerElement.textContent = currentTimerValue; // Set the timer to the stored value
    timerElement.style.backgroundColor = 'green'; // Reset background color
    timerElement.style.color = ''; // Reset text color
    timerElement.classList.remove('blink'); // Remove the blinking effect class
}

// Play the audio
function playAudio() {
    if (!isAudioPlaying) {
        audio.play();
        isAudioPlaying = true;
    }
}

// Stop the audio
function stopAudio() {
    audio.pause();
    audio.currentTime = 0;
    isAudioPlaying = false;
}

// Initialize the page
document.addEventListener('DOMContentLoaded', fetchQuestions);
const stopTimerBtn = document.getElementById('stop-timer-btn');
if (stopTimerBtn) {
    stopTimerBtn.addEventListener('click', stopTimer);
}