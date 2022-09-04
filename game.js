window.addEventListener('load', WindowLoaded);

function WindowLoaded(){
    var startDiv = document.getElementById("start");
    var boundaryDivs = document.getElementsByClassName("boundary");
    var statusElement = document.getElementById("status");
    var endElement = document.getElementById("end");

    var gameStarted = false;
    var lost = false;
    var won = false;

    var score = 0;
    let seconds = 10;

    startDiv.addEventListener("mouseenter", function() { StartGame(boundaryDivs); });
    endElement.addEventListener("mouseenter", WonGame);

    for(var i = 0; i < boundaryDivs.length - 1; i++){
        boundaryDivs[i].addEventListener("mouseenter", function() { LoseGame(gameStarted, boundaryDivs); } );
    }

    //Game started function that is called when the player moves the mouse into the S box
    function StartGame(_boundaryDivs){
        if(!gameStarted){
            seconds = 10;
        }
        CheckPosition();
        gameStarted = true;
        for(var i = 0; i < _boundaryDivs.length - 1; i++){
            _boundaryDivs[i].style.backgroundColor = "#eeeeee";
        }
    }

    //Game lost function called when the player touches the walls or tries to exit the starting position
    function LoseGame(_gameStarted, _boundaryDivs){
        if(gameStarted){
            for(var i = 0; i < boundaryDivs.length - 1; i++){
                boundaryDivs[i].style.backgroundColor = "red";
            }
            lost = true;
            UpdateScore();
            statusElement.innerHTML = "You Lost! Score: " + score;
            gameStarted = false;
        }
    }

    function WonGame(){
        if(gameStarted){
            won = true;
            lost = false;
            UpdateScore();
            statusElement.innerHTML = "You Won! Begin again by moving your mouse over the 'S'  Score: " + score;
            gameStarted = false;
        }
    }

    //Check position function that gets the X axis of the mouse and the starting position and if the mouse is outside the div the
    //LoseGame function is called
    function CheckPosition(){
        onmousemove = function(e){
            xPos = e.clientX;
            yPos = e.clientY;
            var offsets = startDiv.getBoundingClientRect();
            var left = offsets.left;
            if(left > xPos){
                LoseGame();
            }
        }

    }

    function UpdateScore(){
        if(lost){
            score -= 10;
        }
    
        if(won){
            score += 5;
            won = false;
        }
    }

    //Simple countdown implementation
    setInterval(updateCountDown, 1000);
    function updateCountDown(){
        if(gameStarted){
            statusElement.innerHTML = "Game Started! Score: " + score + " TIME LEFT: " + seconds;
            seconds--;
            console.log(seconds);
        }
        if(seconds <= -1){
            LoseGame();
        }
    }
}