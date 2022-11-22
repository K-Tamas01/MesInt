const seed = require("random-seed");

function generator(size, citiesDistance_x, citiesDistance_y, seedData){

    var array = [{}]

    const seedInit = seed.create()

    seedInit.seed(seedData)
    for(i = 0; i < size; i++) {
        array[i] = {
            x: seedInit(citiesDistance_x),
            y: seedInit(citiesDistance_y),
            counter: 0,
        }
    }

    return array;
}

module.exports = {
    generator
}