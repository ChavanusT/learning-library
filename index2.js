const moment = require("moment");
const pg4 = require("./playground4");

function main() {
    const allowedDateFormats = [
        "DD/MM/YYYY",
        "DD/M/YYYY",
        "YYYY/MM/DD",
        "YYYY-MM-DD",
        "DD-MM-YYYY",
        "DD-M-YYYY",
        "D/M/YYYY",
    ];
    const s = "2/7/2016";
    let convertDate = moment(s, allowedDateFormats);
    console.log(convertDate);
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

main2();
//main3();
