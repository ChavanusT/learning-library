const moment = require("moment");
const pg4 = require("./playground4");

function main() {
    const csv = "abc.jpg.csv";
    regex = new RegExp("[^.]+$");
    extension = csv.match(regex);
    console.log(extension[0]);

    const abc = ["a", "b", "c"];
    console.log(`Show me ${abc.join(",")}`);
}

main();

// -> Promise all for api/v3/report/employment/index.js
// make optimize
// async function main2() {
//     let x = new Promise((resolve, reject) => {});
// }

// async function main3() {
//     const db = await pg4.startSequelize();
//     await pg4.testTransaction(db);
// }

//main3();
