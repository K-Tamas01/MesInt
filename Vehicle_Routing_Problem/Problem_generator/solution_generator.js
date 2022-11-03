const solution = ((array, drivers) =>{

    let node = ( array.length - 1 ) / drivers ;

    let freeCount = array.length - 1;

    const routes = [];

    let allSumDistance = 0;

    for(k = 0; k < drivers; k++){

        let route = "0 -> ";
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
            route += base + " -> "; 
            array[base].counter++;
            freeCount -= 1;

        }

        sumDistance += Math.abs(array[0].x - array[base].x) + Math.abs(array[0].y - array[base].y);

        route += "0";

        console.log("\nTruck No.: "+ k);
        console.log(route);
        console.log("Distance for route: "+sumDistance +" m\n");

        allSumDistance += sumDistance;
        

        routes.push(route);
    }
    
    console.log("Total distance of all routes: "+allSumDistance+" m")

}) 

module.exports = {
    solution
}