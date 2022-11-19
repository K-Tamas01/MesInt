const { generator } = require("./Problem_generator/seed");
const { solution } = require("./Problem_generator/solution_generator");

const routePlanning = ((citiesCount, citiesDistance_x, citiesDistance_y, driverCount, generationCount) =>{
    const records = generator(citiesCount, citiesDistance_x, citiesDistance_y);

    return solution(records,driverCount, generationCount);
})

module.exports = {
    routePlanning,
}