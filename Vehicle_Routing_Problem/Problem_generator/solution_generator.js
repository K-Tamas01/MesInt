const { distanceCalc, probabilityCalc, rand, allDrivedDistance } = require("./function")

const solution = ((points, drivers, generationCount) =>{

    let node = ( points.length - 1 ) / drivers 

    let freeCount = points.length - 1

    const routes = []

    let allSumDistance = 0

    for(k = 0; k < drivers; k++){

        const route = {driverRoute: [0], distance: 0, probability: 0, rand: 0, crossOver: undefined, parent: false}
        let base = 0
        let sumDistance = 0

        for(i = 0 ; freeCount != 0 && i < node; i++){
            let min_x = points[base].x
            let min_y = points[base].y

            let distance = Infinity

            for(j = 1; j < points.length; j++){
                if(base != j && points[j].counter == 0 && (Math.abs(min_x - points[j].x) + Math.abs(min_y - points[j].y)) < distance){
                    distance = Math.abs(min_x - points[j].x) + Math.abs(min_y - points[j].y)
                    base = j
                }
            }
            sumDistance += distance
            
            route.driverRoute.push(base)

            points[base].counter++
            freeCount -= 1

        }
        route.driverRoute.push(0)
        sumDistance += Math.abs(points[0].x - points[base].x) + Math.abs(points[0].y - points[base].y)

        allSumDistance += sumDistance
        
        route.distance = sumDistance
        routes.push(route)
    }
    
    return geneticAlgorithm(routes, allSumDistance, points, generationCount)
})

const geneticAlgorithm = ((initPopulation, sumDistance, points, generationCount) =>{
    const generations = [{generation: initPopulation}]

    for(let gen = 1; gen < generationCount; gen++){
        const population = []
        const objValues = Object.values(generations[0].generation)
        for(let i = 0; i < generations[gen - 1].generation.length; i++){
            let obj = {driverRoute: objValues[i].driverRoute, distance: objValues[i].distance, probability: 0, rand: 0, crossOver: undefined, parent: false}
            population.push(obj)
        }

        //Fitness valószínűség
        for(let i = 0; i < population.length; i++){
            population[i].probability = probabilityCalc(population[i].distance, sumDistance)
            population[i].rand = rand()
        }

        // //Kiválasztás...
        for(let i = 0; i < population.length; i++){
            let selection = 0
            for(j = 0; j < population.length; j++){
                selection += population[j].probability

                if(population[i].rand <= selection && population[i].parent != true && population[j].parent != true && i != j){
                    population[i].crossOver = j
                    population[i].parent = true
                    population[j].crossOver = i
                    population[j].parent = true
                }
            }
        }
        
        //Keresztezés
        for(let i = 0; i < population.length; i++){
            if(population[i].crossOver > i){
                let index = population[i].crossOver
                let firstElement = Math.floor(Math.random() * (population[i].driverRoute.length - 2) + 1)
                let secondElement = Math.floor(Math.random() * (population[index].driverRoute.length - 2) + 1)
                let range = 3

                for(let k = 0; k < range; k++){
                    if(firstElement + k > population[i].driverRoute.length - 2){
                        firstElement = 1
                    }
                    if(secondElement + k > population[index].driverRoute.length - 2){
                        secondElement = 1
                    }

                    let temp = population[i].driverRoute[firstElement + k]
                    population[i].driverRoute[firstElement + k] = population[index].driverRoute[secondElement + k]
                    population[index].driverRoute[secondElement + k] = temp
                }
            }
        }
        
        //Mutáció
        for(let i = 0; i < population.length; i++){
            let firstElement = Math.floor(Math.random() * (population[i].driverRoute.length - 2) + 1)
            let secondElement = 0

            do{
                secondElement = Math.floor(Math.random() * (population[i].driverRoute.length - 2) + 1)
            }
            while(firstElement == secondElement)

            temp = population[i].driverRoute[firstElement]
            population[i].driverRoute[firstElement] = population[i].driverRoute[secondElement]
            population[i].driverRoute[secondElement] = temp

            population[i].distance = distanceCalc(population[i].driverRoute, points)
        }
        generations.push({generation: population})
    }
    //Legjobb útvonal hosszúságú generációt kiválasztom
    let bestGen = 0
    let bestRoutesDistance = allDrivedDistance(generations[bestGen].generation)
    for(let i = 0; i < generations.length; i++){
        if(bestRoutesDistance > allDrivedDistance(generations[i].generation)) {
            bestGen = i
            bestRoutesDistance = allDrivedDistance(generations[i].generation)
        }
    }

    return generations[bestGen].generation
})

module.exports = {
    solution,
}