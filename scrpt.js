import { updateGround, setUpGround } from "./ground.js";
import { updateDino, setUpDino, getDinoRect, setDinoLose } from "./dino.js";
import { updatePlant, setUpPlant, getPlantRects } from "./plant.js";
const WORLD_WIDTH = 100
const WORLD_HEIGHT = 30
const SCALE_INC = 0.00001;

const worldElem = document.querySelector("[data-world]");
const scoreElem = document.querySelector("[data-score]");
const startScreenElem = document.querySelector("[data-start-screen]");
let speedScale = 1;
let lastTime;
let score;
if (window.localStorage.getItem("score")) {
    scoreElem.textContent = `Max Score: ${window.localStorage.getItem("score")}`;
} else {
    scoreElem.textContent = "0";

}
setPixelToWorldScale();
window.addEventListener("resize", setPixelToWorldScale);
document.addEventListener("keydown", start, { once: true });
function update(time) {
    if (lastTime == null) {
        lastTime = time;
        window.requestAnimationFrame(update);
        return;
    }
    const delta = time - lastTime;
    updateGround(delta, speedScale);
    updateSpeedScale(delta);
    updateScore(delta);
    updateDino(delta, speedScale);
    updatePlant(delta, speedScale);
    if (checkEnd()) {
        return handleLose()
    }
    lastTime = time;
    window.requestAnimationFrame(update);
}

function checkEnd() {
    let dinorect = getDinoRect();
    let plantrect = getPlantRects();
    let collided = false;
    for (const plantrec of plantrect) {
        if (iscollided(plantrec, dinorect)) {
            collided = true;
            break;
        }
    }
    return collided;
}
function iscollided(rect1, rect2) {
    return (rect1.left < rect2.right &&
        rect1.top < rect2.bottom &&
        rect1.right > rect2.left &&
        rect1.bottom > rect2.top);
}
function updateScore(delta) {
    //for every 100ms passes the score inc by one
    score += delta * 0.01;
    scoreElem.textContent = Math.floor(score);
    if (window.localStorage.getItem("score")) {
        window.localStorage.setItem("score", Math.max(window.localStorage.getItem("score"), Math.floor(Math.floor(score))));
    } else
        window.localStorage.setItem("score", Math.floor(score));
}
function updateSpeedScale(delta) {
    speedScale += delta * SCALE_INC;
}
function handleLose() {
    setDinoLose();
    setTimeout(() => {
        document.addEventListener("keydown", start, { once: true });
        startScreenElem.classList.remove("hide");
    }, 100)
}
function start() {
    lastTime = null;
    speedScale = 1;
    score = 0;
    startScreenElem.classList.add("hide");
    setUpGround();
    setUpDino();
    setUpPlant();
    window.requestAnimationFrame(update);
}
function setPixelToWorldScale() {
    let worldToPixelScale
    if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
        worldToPixelScale = window.innerWidth / WORLD_WIDTH;
    } else {
        worldToPixelScale = window.innerHeight / WORLD_HEIGHT;
    }

    worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`;
    worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`;
}