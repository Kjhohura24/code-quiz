window.addEventListener("load", displayHighscores);

function displayHighscores() {
    
    var highscores = JSON.parse(localStorage.getItem("highscores")) || [];

    
    highscores.sort((a,b) => b.score - a.score);

    
    var highscoresList = document.getElementById("highscores");

    
    highscoresList.innerHTML = "";

    
    highscores.forEach(highscore => {
        var listItem = document.createElement("li");
        listItem.innerHTML = `${highscore.initials} - ${highscore.score}`;
        highscoresList.appendChild(listItem);
    });
}


document.getElementById("clear").addEventListener("click", clearHighscores);


function clearHighscores() {
    highscores = [];
    localStorage.removeItem("highscores");
    displayHighscores();
}
