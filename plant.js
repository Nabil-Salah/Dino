import { getCustomProp, setCustomProp, incCustomProp } from "./helper.js";
const SPEED = 0.05;
const PLANT_MIN = 500
const PLANT_MAX = 2000
const worldElem = document.querySelector("[data-world]")
let nextPlantTime
export function setUpPlant() {
    nextPlantTime = PLANT_MIN
    document.querySelectorAll("[data-plant]").forEach(plant => {
        plant.remove()
    })
}

export function updatePlant(delta, speedScale) {
    document.querySelectorAll("[data-plant]").forEach(plant => {
        incCustomProp(plant, "--left", delta * speedScale * SPEED * -1);
        if (getCustomProp(plant, "--left") <= -100) {
            plant.remove();
        }
    })

    if (nextPlantTime <= 0) {
        createPlant();
        nextPlantTime =
            randomNumberBetween(PLANT_MIN, PLANT_MAX) / speedScale;
    }
    nextPlantTime -= delta;
}
export function getPlantRects() {
    return [...document.querySelectorAll("[data-plant]")].map(plant => {
        return plant.getBoundingClientRect()
    })
}
function createPlant() {
    const plant = document.createElement("img")
    plant.dataset.plant = true
    plant.src = "imgs/cactus.png"
    plant.classList.add("plant")
    setCustomProp(plant, "--left", 100)
    worldElem.append(plant)
}

function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}