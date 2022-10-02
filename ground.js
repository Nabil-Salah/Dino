import { getCustomProp, setCustomProp, incCustomProp } from "./helper.js";
let grounds = document.querySelectorAll("[data-ground]");
let SPEED = 0.05;
export function setUpGround() {
    setCustomProp(grounds[0], "--left", 0);
    setCustomProp(grounds[1], "--left", 300);
}
export function updateGround(delta, speedScale) {
    grounds.forEach((ground) => {
        incCustomProp(ground, "--left", delta * SPEED * speedScale * -1);
        if (getCustomProp(ground, "--left") <= -300) {
            incCustomProp(ground, "--left", 600);
        }
    })
}