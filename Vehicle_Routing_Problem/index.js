const { generator } = require("./Problem_generator/seed");
const { solution } = require("./Problem_generator/solution_generator");

const records = generator(500);

solution(records,50);