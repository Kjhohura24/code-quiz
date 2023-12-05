var timer = 60;
var currentQuestion = 0;
var score = 0;

document.getElementById("start").addEventListener("click", startGame);


var intervalId;

function startGame() {
    
    document.getElementById("start-screen").classList.add("hide");
    document.getElementById("questions").classList.remove("hide");

    intervalId = setInterval(updateTimer, 1000);
    updateTimer();

    displayQuestion();
}

function updateTimer() {
    timer--;
    document.getElementById("time").innerHTML = timer;

    if (timer === 0) {
        endGame()
    }
}

function displayQuestion() {
    var question = questions[currentQuestion].question;
    var answers = questions[currentQuestion].answers;

    document.getElementById("question-title").innerHTML = question;

    document.getElementById("choices").innerHTML = "";

    for (var i = 0; i < answers.length; i++) {
        var answerBtn = document.createElement("button");
        answerBtn.innerHTML = answers[i];
        answerBtn.setAttribute("value", answers[i]);
        answerBtn.addEventListener("click", checkAnswer);
        document.getElementById("choices").appendChild(answerBtn);
    }
}

function checkAnswer(event) {
    var selectedAnswer = event.target.value;
    var correctAnswer = questions[currentQuestion].correctAnswer;

    if (selectedAnswer === correctAnswer) {
        score++;
    } else {
        document.getElementById("feedback").innerHTML = "Wrong answer!";
        timer -= 10;
    }

    currentQuestion++;

    if (currentQuestion === questions.length) {
        endGame();
    } else {
        displayQuestion();
    }
}

function endGame() {
    
    clearInterval(intervalId);

    document.getElementById("questions").classList.add("hide");
    document.getElementById("end-screen").classList.remove("hide");

    feedback = document.getElementById("feedback");
    feedback.parentNode.removeChild(feedback);

    document.getElementById("final-score").innerHTML = score;
}
document.getElementById("submit").addEventListener("click", function() {

    var initials = document.getElementById("initials").value;
    var score = document.getElementById("final-score").innerHTML;

    var highscore = {
        initials: initials,
        score: score
    };

    var highscores = JSON.parse(localStorage.getItem("highscores"));

    if (!highscores) {
        highscores = [];
    }

    highscores.push(highscore);

    
    localStorage.setItem("highscores", JSON.stringify(highscores));
});
