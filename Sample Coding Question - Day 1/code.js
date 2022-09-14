const fs = require('fs')
const input = []
const DATA = fs.readFileSync('input.txt').toString().split('\n')

DATA.forEach(item => {
    const num = parseInt(item)
    input.push(num)
});
console.log(input)


// const input = [1, 2, 1, 3, 4, 5, 3, 5, 6, 2, 3, 44, 55, 66, 77, 88, 99, 4, 2]

const AllPossibleScores = []
const AllPossibleRoutes = []
const allRoutes = []
const expected = 70;
const score = 10;
let TotalFun = 0;
let previousFun = input[0];
let route = []
let routeNumber = 0;

input.forEach((currentFun, i) => {
    if (currentFun > previousFun || i == 0) {
        TotalFun += score;
        route.push(currentFun)

    }
    else {
        allRoutes.push({ TotalFun, route })
        AllPossibleScores.push(TotalFun)
        AllPossibleRoutes.push(route)
        route = []
        route.push(currentFun)
        TotalFun = score;

    }
    if (i == input.length - 1) {
        allRoutes.push({ TotalFun, route })
        AllPossibleScores.push(TotalFun)
        AllPossibleRoutes.push(route)
        route = []
    }
    previousFun = currentFun
});


console.log('All Possible Routes For Bob to Take : ')
console.table(allRoutes)


const MaxScore = Math.max(...AllPossibleScores)
routeNumber = AllPossibleScores.indexOf(MaxScore)
console.log(`\n\nCheck Number ${routeNumber} for validation of the final answer.\n\n\n`)
console.log('Max Score           : ', MaxScore)
console.log('Best Route          : ', JSON.stringify(AllPossibleRoutes[routeNumber]))


fs.writeFileSync('output.txt', MaxScore.toString())