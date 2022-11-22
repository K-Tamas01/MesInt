const express = require("express");
const app = express();
app.use(express.json())
const PORT = 4500;
const { generator } = require("./Problem_generator/seed");
const { solution } = require("./Problem_generator/solution_generator");

const routePlanning = ((citiesCount, citiesDistance_x, citiesDistance_y, driverCount, generationCount, seedData) =>{
    const records = generator(citiesCount, citiesDistance_x, citiesDistance_y, seedData);

    return solution(records,driverCount, generationCount);
})


app.get('/', (req, res) =>{
    const {citiesCount, citiesDistance_x, citiesDistance_y, driverCount, generationCount, seedData} = req.body
    res.status(200).send(routePlanning(citiesCount, citiesDistance_x, citiesDistance_y, driverCount, generationCount, seedData))
})

var server = app.listen(PORT, function(){
    var host = server.address().address
    var port = server.address().port

    console.log("Server is running at : http://%s:%s", host, port)
    console.log("Server is running at : http://127.0.0.1:%s", port)
})