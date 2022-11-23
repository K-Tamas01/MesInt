const {probabilityCalc, rand} = require("./function")

const fitnesAndRand = ((population, sumDistance) => {
    for(let i = 0; i < population.length; i++){
        population[i].probability = probabilityCalc(population[i].distance, sumDistance)
        population[i].rand = rand()
    }
})

module.exports = {
    fitnesAndRand
}