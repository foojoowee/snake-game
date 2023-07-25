import { onSnake, expandSnake } from "./snake.js"
import { randomGridPosition } from "./grid.js"

let food = getRandomFoodPosition()
let scoreCount = 0;
export let levelCount = 1;
const score = document.getElementsByClassName("score")[0];
const level = document.getElementsByClassName("level")[0];
const highScore = document.getElementsByClassName("high-score")[0];
const highScoreContent = parseInt(highScore.textContent.slice(11));
const EXPANSION_RATE = 1;

export function update(){
    if (onSnake(food)){
        expandSnake(EXPANSION_RATE)
        food = getRandomFoodPosition()
        scoreCount += 1;
    }
    score.innerHTML = `Score: ${scoreCount}`
    levelCount = Math.floor(scoreCount / 5) + 1
    level.innerHTML = `Level: ${levelCount}`
    if (scoreCount > highScoreContent){
        highScore.innerHTML = `High Score: ${scoreCount}`
        const saveScore = [{score: `${scoreCount}`}]
        const stringifyScore = JSON.stringify(saveScore)
        localStorage.setItem('highScore', stringifyScore)
    }
}

export function draw(gameBoard){
    const foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add('food')
    gameBoard.appendChild(foodElement)
}

function getRandomFoodPosition(){
    let newFoodPosition;
    while (newFoodPosition == null || onSnake(newFoodPosition)){
        newFoodPosition = randomGridPosition()
    }
    return newFoodPosition
}

