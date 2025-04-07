const gameId = {
    gameContainer: document.getElementById("game-container"),
    gameBoard: document.getElementById("game-board"),
    ball: document.getElementById("ball"),
    paddleLeft: document.getElementById("paddle-left"),
    paddleRight: document.getElementById("paddle-right"),
    scoreLeft: document.getElementById("score-left"),
    scoreRight: document.getElementById("score-right")
}


//variable globale avec valeur default const
const gameHeight:number = 400;
// const gameWidth:number = 800;
// const ballSize:number = 40;
const paddleHeight:number = 80;
// const paddleWidth:number = 10;
const paddleSpeed:number = 8;

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
    ballX:  390,
    ballY: 190,
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

  //recup id apres modification
  gameId.paddleLeft = document.getElementById('paddle-left');
  gameId.paddleRight = document.getElementById('paddle-right');
  
  if (gameId.paddleLeft) {
    gameId.paddleLeft.style.top = `${gameState.paddleLeftY}px`;
  }
  if (gameId.paddleRight) {
    gameId.paddleRight.style.top = `${gameState.paddleRightY}px`;
  }
}

function gameLoop(): void {
  updatePaddles();
  setupKeyPress();
  requestAnimationFrame(gameLoop);
}

gameLoop();
