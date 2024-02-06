document.addEventListener("DOMContentLoaded", function() {
    const correctButton = document.getElementById("correctButton");
    const incorrectButton = document.getElementById("incorrectButton");
    const audioPlayer = document.getElementById("audioPlayer");

    correctButton.addEventListener("click", function() {
        playRandomAudio("correct");
    });

    incorrectButton.addEventListener("click", function() {
        playRandomAudio("incorrect");
    });

    function playRandomAudio(folderName) {
        const audioFolder = `path/to/${folderName}/`; // Replace with the actual path to your audio folders

        fetch(`${audioFolder}index.json`)
            .then(response => response.json())
            .then(data => {
                const randomIndex = Math.floor(Math.random() * data.length);
                const randomAudioFile = data[randomIndex];

                audioPlayer.src = `${audioFolder}${randomAudioFile}`;
                audioPlayer.play();
            })
            .catch(error => console.error("Error fetching audio files:", error));
    }
});
