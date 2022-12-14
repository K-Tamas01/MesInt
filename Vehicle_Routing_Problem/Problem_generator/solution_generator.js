const { crossing } = require("./crossing")
const { fitnesAndRand } = require("./fitnes_rand")
const { min } = require("./function")
const { mutation } = require("./mutation")
const { selection } = require("./selection")

const solution = ((points, drivers, generationCount) =>{

    let node = ( points.length - 1 ) / drivers 

    let freeCount = points.length - 1

    const routes = []

    let allSumDistance = 0

    for(k = 0; k < drivers; k++){

        const route = {driverRoute: [0], coords: [points[0]], distance: 0, probability: 0, rand: 0, crossOver: undefined, parent: false}
        let base = 0
        let sumDistance = 0

        for(i = 0 ; freeCount != 0 && i < node; i++){
            let min_x = points[base].x
            let min_y = points[base].y

            let distance = Infinity
            let coord = null

            for(j = 1; j < points.length; j++){
                if(base != j && points[j].counter == 0 && (Math.abs(min_x - points[j].x) + Math.abs(min_y - points[j].y)) < distance){
                    distance = Math.abs(min_x - points[j].x) + Math.abs(min_y - points[j].y)
                    base = j
                    coord = points[j]
                }
            }
            sumDistance += distance
            
            route.driverRoute.push(base)
            route.coords.push(coord)

            points[base].counter++
            freeCount -= 1

        }
        route.driverRoute.push(0)
        route.coords.push(points[0])
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
        const objValues =  JSON.parse(JSON.stringify(generations[gen - 1].generation))

        for(let i = 0; i < generations[gen - 1].generation.length; i++){
            let obj = {driverRoute: objValues[i].driverRoute, coords: objValues[i].coords, distance: objValues[i].distance, probability: 0, rand: 0, crossOver: undefined, parent: false}
            population.push(obj)
        }

        //Fitness val??sz??n??s??g
        fitnesAndRand(population, sumDistance)

        // //Kiv??laszt??s...
        selection(population)
        
        //Keresztez??s
        crossing(population)
        
        //Mut??ci??
        mutation(population, points)
        generations.push({generation: population})
    }

    //Legjobb ??tvonal hossz??s??g?? gener??ci??t kiv??lasztom
    return generations[min(generations)].generation
})

module.exports = {
    solution,
}