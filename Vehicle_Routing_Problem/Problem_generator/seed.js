const seed = require("random-seed");

function generator(size){

    var array = [{}];

    const date = new Date;
    const dateInSec = date.getHours()*60*60+date.getMinutes()*60+date.getSeconds();     //SEED

    const seedInit = seed.create();

    seedInit.seed('a')
    for(i = 0; i < size; i++) {
        array[i] = {
            x: seedInit(500),
            y: seedInit(500),
            counter: 0,
        }
    }

    return array;
}

module.exports = {
    generator
}