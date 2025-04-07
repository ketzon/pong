const gameId = {
    game_container: document.getElementById("game-container"),
    game_board: document.getElementById("game-board"),
    ball: document.getElementById("ball"),
    paddle_left: document.getElementById("paddle_left"),
    paddle_right: document.getElementById("paddle_right"),
    score_left: document.getElementById("score-left"),
    score_right: document.getElementById("score-right")
}

console.log(gameId.game_container);


//variable globale avec valeur default const
const gameHeight:number = 400;
const gameWidth:number = 800;
const ballSize:number = 20;
const paddleHeight:number = 160;
const paddleWidht:number = 10;

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
    arrowUp:boolean;
    arrowDown:boolean;
}

//setup tout sur false
let keys: Keys = {
    w: false,
    s: false,
    arrowUp: false,
    arrowDown: false
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

document.addEventListener("keydown", event => {
    if (event.key.startsWith("s")){
        console.log("fsdfsd")
        console.log(gameId.paddle_left)
    }
})

