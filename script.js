let currentQuestionIndex = 0; // Start with the first question
let questions = [];
let answerDisplayed = false;
let timerInterval;
let audio = new Audio('timer.mp3');
let isAudioPlaying = false;
let currentTimerValue = 30; // Initial timer value

audio.addEventListener('ended', function () {
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
        },
        error: function (err) {
            console.error('Error loading questions:', err);
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

// Display the answer to the current question
function showAnswer() {
    const answerContainer = document.getElementById('answer-container');
    answerContainer.innerHTML = ''; // Clear previous answers

    const answer = questions[currentQuestionIndex].Answer;
    const answerElement = document.createElement('h3');
    answerElement.id = 'answer';
    answerElement.textContent = `Answer: ${answer}`;
    answerElement.style.color = 'black';
    answerElement.style.backgroundColor = 'rgb(244, 236, 13)';
    answerElement.style.fontWeight = 'bold';
    answerElement.style.padding = '5px';
    answerElement.style.borderRadius = '20px';
    answerContainer.appendChild(answerElement);
    
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

// Display the next question
function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
        stopTimer(); // Stop the timer when switching questions
        resetTimer(); // Reset timer to 30 seconds
    }
}

// Display the previous question
function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
        stopTimer(); // Stop the timer when switching questions
        resetTimer(); // Reset timer to 30 seconds
    }
}

// Start the timer countdown from the current point
function startTimer() {
    if (!timerInterval) {
        playAudio();

        let seconds = currentTimerValue; // Start from the current stored value
        const timerElement = document.getElementById('timer');

        timerInterval = setInterval(function () {
            seconds--;
            currentTimerValue = seconds; // Update current timer value

            const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
            timerElement.textContent = formattedSeconds;
            updateTimerStyles(seconds);

            if (seconds === 0) {
                clearInterval(timerInterval);
                timerElement.classList.add('blink'); // Blink when time is up
                timerInterval = null; // Reset interval reference
            }
        }, 1000);
    }
}

// Stop the timer
function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null; // Reset interval reference to avoid multiple timers
    stopAudio();
}

// Reset the timer to 30 seconds
function resetTimer() {
    currentTimerValue = 30; // Reset timer value to 30 seconds
    const timerElement = document.getElementById('timer');
    timerElement.textContent = currentTimerValue;
    timerElement.style.backgroundColor = 'green';
    timerElement.style.color = 'white';
    timerElement.classList.remove('blink');
}

// Update timer styles based on seconds
function updateTimerStyles(seconds) {
    const timerElement = document.getElementById('timer');
    if (seconds > 20) {
        timerElement.style.backgroundColor = 'green';
        timerElement.style.color = 'white';
    } else if (seconds > 10) {
        timerElement.style.backgroundColor = 'yellow';
        timerElement.style.color = 'black';
    } else {
        timerElement.style.backgroundColor = 'red';
        timerElement.style.color = 'white';
    }
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
