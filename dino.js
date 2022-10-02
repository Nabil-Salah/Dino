import { getCustomProp, setCustomProp, incCustomProp } from "./helper.js";
const JUMP_SPEED = 0.45
const GRAVITY = 0.0015
const DINO_FRAME_COUNT = 2
const FRAME_TIME = 100

let isJumping
let dinoFrame
let currentFrameTime
let yVelocity

let dino = document.querySelector("[data-dino]");
export function setUpDino() {
    isJumping = false;
    dinoFrame = 0;
    currentFrameTime = 0;
    yVelocity = 0;
    setCustomProp(dino, "--bottom", 0);
    document.removeEventListener("keydown", onJump);
    document.addEventListener("keydown", onJump);
}
export function updateDino(delta, speedScale) {
    dinoRun(delta, speedScale);
    dinoJump(delta);
}
export function getDinoRect() {
    return dino.getBoundingClientRect();
}
export function setDinoLose() {
    dino.src = "imgs/dino-lose.png";
}
function dinoRun(delta, speedScale) {
    if (isJumping) {
        dino.src = `imgs/dino-stationary.png`;
        return;
    }
    //not too realstic, we don't go for a constant speed
    // if (dino.src === `imgs/dino-stationary.png`)
    //     dino.src = `dino-run-1.png`;
    // else if (dino.src === `dino-run-1.png`)
    //     dino.src = `dino-run-2.png`;
    // else
    //     dino.src = `dino-run-1.png`;
    if (currentFrameTime >= FRAME_TIME) {
        dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT;
        dino.src = `imgs/dino-run-${dinoFrame}.png`;
        currentFrameTime -= FRAME_TIME;
    }
    currentFrameTime += delta * speedScale;
}
function dinoJump(delta) {
    if (!isJumping) {
        return;
    }
    incCustomProp(dino, "--bottom", yVelocity * delta);

    if (getCustomProp(dino, "--bottom") <= 0) {
        setCustomProp(dino, "--bottom", 0);
        isJumping = false;
    }

    yVelocity -= GRAVITY * delta;
}
function onJump(e) {
    if (e.code !== "Space" || isJumping) return

    yVelocity = JUMP_SPEED
    isJumping = true
}