const gameId = {
    gameContainer: document.getElementById("game-container"),
    gameBoard: document.getElementById("game-board"),
    ball: document.getElementById("ball"),
    paddleLeft: document.getElementById("paddle-left"),
    paddleRight: document.getElementById("paddle-right"),
    scoreLeft: document.getElementById("score-left"),
    scoreRight: document.getElementById("score-right"),
    pauseGame: document.getElementById("button-pause"),
    resetGame: document.getElementById("button-reset")
}


//variable globale avec valeur default const
const gameHeight:number = 400; //valeur de base
const gameWidth:number = 800; //valeur de base
const ballSize:number = 20; //valeur de base 20
const paddleHeight:number = 80;
const paddleWidth:number = 10;
const paddleSpeed:number = 8;
const margin:number = 10;

//game status variable
let pause:boolean = true;

type GameState = {
    ballX:number;
    ballY:number;
    ballSpeedX:number;
    ballSpeedY:number;
    paddleLeftY:number;
    paddleRightY:number;
    scoreRight:number;
    scoreLeft:number;
}

type Keys = {
    w:boolean;
    s:boolean;
    ArrowUp:boolean;
    ArrowDown:boolean;
}

//setup tout sur false
let keys: Keys = {
    w: false,
    s: false,
    ArrowUp: false,
    ArrowDown: false
}

//init les valeurs avec pong de base
let gameState: GameState = {
    ballX:  390, //la moitie de la balle = 10 et moitie de laxe x = 400. 400 -10 = 390
    ballY: 190, // moitie de la balle - axe y (400 / 2) = 190
    ballSpeedX: 5,
    ballSpeedY:  2,
    paddleLeftY: 160,
    paddleRightY: 160,
    scoreRight: 0,
    scoreLeft: 0
}

//analyse un event clavier et check avec in si la bonne touch est press
function setupKeyPress(): void {
    window.addEventListener("keydown", (event) => {
        console.log("listen key: ", event.key);
        if (event.key in keys) {
            keys[event.key as keyof Keys] = true; //keyof pas necessaire si init direct keys en const a la place de type
        }
    })
    window.addEventListener("keyup", (event) => {
        if (event.key in keys) { 
            keys[event.key as keyof Keys] = false;
        }
    })
}

//reduit les valeur de paddle si je monte et augmente pour descendre pour ensuite maligner visuellement avec top, plus le chiffre est faible plus je suis haut et inversement
function updatePaddles(): void {
    if (keys.w && gameState.paddleLeftY > 0) {
        gameState.paddleLeftY -= paddleSpeed;
    }
    if (keys.s && gameState.paddleLeftY < gameHeight - paddleHeight) {
        gameState.paddleLeftY += paddleSpeed;
    }
    if (keys.ArrowUp && gameState.paddleRightY > 0) {
        gameState.paddleRightY -= paddleSpeed;
    }
    if (keys.ArrowDown && gameState.paddleRightY < gameHeight - paddleHeight) {
        gameState.paddleRightY += paddleSpeed;
    }
    if (gameId.paddleLeft) {
        gameId.paddleLeft.style.top = `${gameState.paddleLeftY}px`;
    }
    if (gameId.paddleRight) {
        gameId.paddleRight.style.top = `${gameState.paddleRightY}px`;
    }
}

//recentre la balle avec un delais init le score et renvoie la balle 
function resetBall():void {
    //remet la balle au centre sans ms
    gameState.ballSpeedX = 0;
    gameState.ballSpeedY = 0;
    gameState.ballX = gameWidth / 2 - ballSize / 2;
    gameState.ballY = gameHeight / 2 - ballSize / 2;
    if (gameId.scoreRight) {
        gameId.scoreRight.textContent = `${gameState.scoreRight}`;
    }
    if (gameId.scoreLeft) {
        gameId.scoreLeft.textContent = `${gameState.scoreLeft}`;
    }
    //envoie la balle en position random positif ou negatif faut opti 
    //pause de 1 sec pour pas trop enchainer
    setTimeout(() => {
        gameState.ballSpeedX = 5 * (Math.random() > 0.5 ? 1 : -1);
        gameState.ballSpeedY = 2 * (Math.random() > 0.5 ? 1 : -1);
    }, 1000)
}


function updateBall(): void {
    gameState.ballX += gameState.ballSpeedX;
    gameState.ballY += gameState.ballSpeedY;
    if (gameState.ballY <= 0 || gameState.ballY >= gameHeight - ballSize){
        gameState.ballSpeedY = -gameState.ballSpeedY;
    }
    //je bounce uniquement a hauteur de paddle && en bas du haut du paddle et au dessus du bas du paddle gauche
    if (gameState.ballX <= margin + paddleWidth &&
        gameState.ballY + ballSize >= gameState.paddleLeftY &&
        gameState.ballY <= gameState.paddleLeftY + paddleHeight) { //pour rebondir a gauche
        gameState.ballSpeedX = -gameState.ballSpeedX;
        gameState.ballX = margin + paddleWidth + 1; //decale de 1pixel pour eviter paddle block
    }
    //bounce a distante de margin + paddle et uniquement sur paddle droite
    if (gameState.ballX + ballSize >= gameWidth - margin - paddleWidth &&
        gameState.ballY + ballSize >= gameState.paddleRightY &&
        gameState.ballY <= gameState.paddleRightY + paddleHeight) {
        gameState.ballSpeedX = -gameState.ballSpeedX;
        gameState.ballX = gameWidth - margin - paddleWidth - ballSize - 1; //decale de 1 pixel pour eviter bug paddle block
    }
    if (gameId.ball){
        gameId.ball.style.left = `${gameState.ballX}px`;
        gameId.ball.style.top = `${gameState.ballY}px`;
    }
    if (gameState.ballX < 0) {

        gameState.scoreRight++;        
        resetBall();
    }
    if (gameState.ballX + ballSize > gameWidth){
        gameState.scoreLeft++;
        resetBall();
    }
}

//change le status de pause
function changePause(): void{
    pause = !pause; //change de true a false et inversement
    if (gameId.pauseGame) {
        if (pause === true) {
         gameId.pauseGame.textContent = "start";
        }
        else {
         gameId.pauseGame.textContent = "pause";
        }
    }
}

//reset le jeu
function resetGame(): void {
    gameState.scoreRight = 0
    gameState.scoreLeft = 0
    gameState.paddleRightY = 160;
    gameState.paddleLeftY = 160;
    resetBall();
}

//ecoute bouton
function listenStatus(): void {
    if (gameId.pauseGame) {
        gameId.pauseGame.addEventListener("click", changePause);
    }
    if (gameId.resetGame) {
        gameId.resetGame.addEventListener("click", resetGame)
    }
}

//main loop
function gameLoop(): void {
    if (pause === false) {
        updatePaddles()
        updateBall();
    }
    listenStatus();
    requestAnimationFrame(gameLoop);
}
setupKeyPress();
gameLoop();
