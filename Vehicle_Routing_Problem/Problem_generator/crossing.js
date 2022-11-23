const crossing = ((population) => {

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
    
                temp = population[i].coords[firstElement + k]
                population[i].coords[firstElement + k] = population[index].coords[secondElement + k]
                population[index].coords[secondElement + k] = temp
            }
        }
    }
})

module.exports = {
    crossing
}