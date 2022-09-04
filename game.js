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

    function UpdateScore(){
        if(lost){
            score -= 10;
            console.log("gg");
        }
    
        if(won){
            score += 5;
            won = false;
        }
    }

    startDiv.addEventListener("mouseenter", function() { StartGame(boundaryDivs); });
    endElement.addEventListener("mouseenter", WonGame);

    for(var i = 0; i < boundaryDivs.length - 1; i++){
        boundaryDivs[i].addEventListener("mouseenter", function() { LoseGame(gameStarted, boundaryDivs); } );
        boundaryDivs[i].addEventListener("mouseenter", ConsoleLog);
    }

    //Game started function that is called when the player moves the mouse into the S box
    function StartGame(_boundaryDivs){
        CheckPosition();
        gameStarted = true;
        for(var i = 0; i < _boundaryDivs.length - 1; i++){
            _boundaryDivs[i].style.backgroundColor = "#eeeeee";
        }
        statusElement.innerHTML = "Game Started! Dont Hit The Walls!  Score: " + score;
        console.log(score);
    }

    function LoseGame(_gameStarted, _boundaryDivs){
        console.log(gameStarted);
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

    function CheckPosition(){
        onmousemove = function(e){
            xPos = e.clientX;
            yPos = e.clientY;
            var offsets = startDiv.getBoundingClientRect();
            var top = offsets.top;
            var left = offsets.left;
            //console.log("Mouse Pos: " + xPos + " " + yPos + "DIV POS:" + left);

            if(left > xPos){
                LoseGame();
            }
        }

    }
}