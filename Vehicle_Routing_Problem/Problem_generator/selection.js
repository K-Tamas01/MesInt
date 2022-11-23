const selection = ((population) => {
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
})

module.exports = {
    selection
}