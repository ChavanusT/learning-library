const moment = require("moment");

function main() {
    const allowedDateFormats = [
        "DD/MM/YYYY",
        "DD/M/YYYY",
        "YYYY/MM/DD",
        "YYYY-MM-DD",
        "DD-MM-YYYY",
        "DD-M-YYYY",
    ];
    const s = "2/11/2016";
    let convertDate = moment(s, allowedDateFormats);
    console.log(convertDate);
}

main();
