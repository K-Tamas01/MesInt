function distanceCalc (driverRoute, array) {
    let distance = 0
    for(let i = 1; i < driverRoute.length; i++){
        distance += Math.abs(array[driverRoute[i - 1]].x - array[driverRoute[i]].x) + Math.abs(array[driverRoute[i - 1]].y - array[driverRoute[i]].y)   
    }
    return distance
}

function probabilityCalc (distance, sumDistance) {
    return Number((distance / sumDistance).toFixed(4))
}

function rand() {
    return Number((Math.random()).toFixed(4))
}

function allDrivedDistance(population) {
    let allDistance = 0
    for(let i = 0; i < population.length; i++) {
        allDistance += population[i].distance
    }
    return allDistance
}


//legjobb indexű generéció kiválasztása
function min(generations){
    let index = 0
    let bestRoutesDistance = allDrivedDistance(generations[index].generation)
    for(let i = 0; i < generations.length; i++){
        if(bestRoutesDistance > allDrivedDistance(generations[i].generation)) {
            index = i
            bestRoutesDistance = allDrivedDistance(generations[i].generation)
        }
    }
    return index
}


module.exports = {
    distanceCalc,
    probabilityCalc,
    rand,
    allDrivedDistance,
    min
}