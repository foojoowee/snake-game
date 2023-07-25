import {update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection} from './snake.js'
import {update as updateFood, draw as drawFood} from './food.js'
import { outsideGrid } from './grid.js'


let lastRenderTime = 0
let gameOver
const gameBoard = document.getElementById("game-board")
const startButton = document.getElementsByClassName("start-button")[0]
const replayButton = document.getElementsByClassName("replay-button")[0]
const gameText = document.getElementsByClassName("game-text")[0]
const highScore = document.getElementsByClassName("high-score")[0];
const oldHighScore = JSON.parse(localStorage.getItem('highScore'))

window.addEventListener("load", () => {
    if (localStorage.length < 1){
        const saveScore = [{score: `10`}]
        const stringifyScore = JSON.stringify(saveScore)
        localStorage.setItem('highScore', stringifyScore)
    }
    highScore.innerHTML = `High Score: ${oldHighScore[0].score}`;
    console.log("Window loaded");
  });

startButton.addEventListener('click', function(){
    console.log("check")
    window.requestAnimationFrame(main);
    startButton.style.display = "none";
})

replayButton.addEventListener('click', function(){
    console.log("check")
    // gameOver = false;
    // gameText.innerHTML = ""
    // replayButton.style.display = "none";
    window.location = "/"

})

function main(currentTime){
    if (gameOver){
        replayButton.style.display = "flex";
        gameText.innerHTML = "You lost, press Replay to play again"
        return
    }
    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender < 1 / SNAKE_SPEED){
        return
    }
    lastRenderTime = currentTime
    update();
    draw();
}

function update(){
    updateSnake()
    updateFood()
    checkDeath()
}

function draw(){
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
}


function checkDeath(){
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}





