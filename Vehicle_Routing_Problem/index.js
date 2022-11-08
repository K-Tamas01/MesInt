const { generator } = require("./Problem_generator/seed");
const { solution } = require("./Problem_generator/solution_generator");

const records = generator(50);

solution(records,10);