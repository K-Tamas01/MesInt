const { distanceCalc } = require("./function")

const mutation = ((population, points) => {
    for(let i = 0; i < population.length; i++){
    let firstElement = Math.floor(Math.random() * (population[i].driverRoute.length - 2) + 1)
    let secondElement = 0

    do{
        secondElement = Math.floor(Math.random() * (population[i].driverRoute.length - 2) + 1)
    }
    while(firstElement == secondElement)

    let temp = population[i].driverRoute[firstElement]
    population[i].driverRoute[firstElement] = population[i].driverRoute[secondElement]
    population[i].driverRoute[secondElement] = temp

    temp = population[i].coords[firstElement]
    population[i].coords[firstElement] = population[i].coords[secondElement]
    population[i].coords[secondElement] = temp

    population[i].distance = distanceCalc(population[i].driverRoute, points)
    }
})

module.exports = {
    mutation,
}