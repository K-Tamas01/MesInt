const solution = ((array, drivers) =>{

    let node = ( array.length - 1 ) / drivers ;

    let freeCount = array.length - 1;

    const routes = [];

    let allSumDistance = 0;

    for(k = 0; k < drivers; k++){

        const route = {driverRoute: [0], distance: 0, probability: 0, rand: 0, crossOver: undefined, parent: false};
        let base = 0;
        let sumDistance = 0;

        for(i = 0 ; freeCount != 0 && i < node; i++){
            let min_x = array[base].x;
            let min_y = array[base].y;

            let distance = Infinity;

            for(j = 1; j < array.length; j++){
                if(base != j && array[j].counter == 0 && (Math.abs(min_x - array[j].x) + Math.abs(min_y - array[j].y)) < distance){
                    distance = Math.abs(min_x - array[j].x) + Math.abs(min_y - array[j].y);
                    base = j;
                }
            }
            sumDistance += distance;
            
            route.driverRoute.push(base);

            array[base].counter++;
            freeCount -= 1;

        }
        route.driverRoute.push(0)
        sumDistance += Math.abs(array[0].x - array[base].x) + Math.abs(array[0].y - array[base].y);

        console.log("\nTruck No.: "+ k);
        console.log(route.driverRoute);
        console.log("Distance for route: "+sumDistance +" m\n");

        allSumDistance += sumDistance;
        
        route.distance = sumDistance;
        routes.push(route);
    }
    
    console.log("Total distance of all routes: "+allSumDistance+" m")

    geneticAlgorithm(routes, allSumDistance, array);

})

const geneticAlgorithm = ((population, sumDistance, array) =>{
    let allSumDrive = 0

    //Fitness valószínűség
    for(i = 0; i < population.length; i++){
        population[i].probability = Number((population[i].distance / sumDistance).toFixed(4))
        population[i].rand = Number((Math.random()).toFixed(4))
    }
    //Kiválasztás...
    for(i = 0; i < population.length; i++){
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
    for(i = 0; i < population.length; i++){
        let index = population[i].crossOver
        let firstElement = Math.floor(Math.random() * (population[i].driverRoute.length - 2) + 1)
        let secondElement = Math.floor(Math.random() * (population[index].driverRoute.length - 2) + 1)

        temp = population[i].driverRoute[firstElement]
        population[i].driverRoute[firstElement] = population[index].driverRoute[secondElement]
        population[index].driverRoute[secondElement] = temp

        population[i].distance = distanceCalc(population[i].driverRoute, array)
        population[index].distance = distanceCalc(population[index].driverRoute, array)
    }
    
    //Mutáció
    for(i = 0; i < population.length; i++){
        let firstElement = Math.floor(Math.random() * (population[i].driverRoute.length - 2) + 1)
        let secondElement = 0

        do{
            secondElement = Math.floor(Math.random() * (population[i].driverRoute.length - 2) + 1)
        }
        while(firstElement == secondElement)

        temp = population[i].driverRoute[firstElement]
        population[i].driverRoute[firstElement] = population[i].driverRoute[secondElement]
        population[i].driverRoute[secondElement] = temp
    }

    for(i = 0; i < population.length; i++)
        allSumDrive += population[i].distance
    console.log(allSumDrive)
})

const distanceCalc = ((driverRoute, array) =>{
    let distance = 0
    for(i = 1; i < driverRoute.length; i++){
        distance += Math.abs(array[driverRoute[i - 1]].x - array[driverRoute[i]].x) + Math.abs(array[driverRoute[i - 1]].y - array[driverRoute[i]].y)   
    }
    return distance
})

module.exports = {
    solution
}