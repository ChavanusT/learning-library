const dayjs = require("dayjs")
const customParseFormat = require("dayjs/plugin/customParseFormat")
const utc = require("dayjs/plugin/utc")

dayjs.extend(customParseFormat)
dayjs.extend(utc)
console.log("app start")
function main() {
    const hourString = "10:00";
    const hour = dayjs(hourString, "HH:mm");

    console.log(hour.hour());
}

main();
