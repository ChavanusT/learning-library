const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
const utc = require("dayjs/plugin/utc");
const short = require("short-uuid");
const ping = require("ping");
const time = require("./playground3");
const tz = require("dayjs/plugin/timezone");

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(tz);

const express = require("express");
const { default: axios } = require("axios");
const app = express();
const port = 3000;

const L = require("./playground");
const cds = require("./playground2");
const readline = require("node:readline");
const sequelize = require("./playground4");

async function main() {
    //L();
    //cds();
    await time.start(); // for test insert time in every type in mssql via typeorm.
    const db = await sequelize.startSequelize(); // for test insert transactions via sequelize.
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const promise = new Promise((resolve, reject) => {
        try {
            rl.question("Want to insert ?", async (e) => {
                if (e == "yes" || e == "y") {
                    console.log("Insert Time!!!");
                    const dateTime2 = dayjs().format();
                    const timeTest = dayjs().format("HH:mm:ss.SSS");
                    const date = dayjs().tz(dayjs.tz.guess());
                    const offset = date.format("Z");
                    const dateTimeOffset = date.format(
                        `YYYY-MM-DD HH:mm:ss.SSS ${offset}`
                    );

                    const d = new Date();
                    // testTTT("abc", (x) => {
                    //     console.log(x);
                    // });

                    const c = dayjs(`2024-07-24 16:00:01.0000000 +00:00`);
                    const ca = dayjs(`2024-07-24 23:00:00.0000000 +00:00`);
                    // console.log(c.local().format());
                    // console.log(ca.local().format());
                    // console.log(
                    //     dayjs(c).local().isSame(dayjs(ca).local(), "day")
                    // );
                    // console.log(dayjs(c).isSame(dayjs(ca), "day"));
                    // // sun = 0 , mon = 1 , tue = 2 , wed = 3 , thu = 4 , fri= 5 , sat = 6
                    // const alpha = ca.local().diff(c.local(), "minute") / 1440;
                    // console.log(alpha);
                    // console.log(Math.ceil(alpha));
                    // console.log(ca.endOf("day").format());
                    // console.log(c.endOf("day").format());
                    console.log(c.format());
                    test(c);
                    console.log(c.format());
                    //console.log(dateTime2, timeTest, dateTimeOffset, unixTime);
                    // await sequelize.testTransaction(db, {
                    //     test_date: dateTime2,
                    //     time: timeTest,
                    //     time_offset: dateTimeOffset,
                    //     time_long: unixTime,
                    // });
                    // await time.insertTime(
                    //     dateTime2,
                    //     timeTest,
                    //     dateTimeOffset,
                    //     unixTime
                    // );
                } else {
                    console.log("No insert Time...");
                }

                rl.question("Want to Query ?", async (e) => {
                    console.log(
                        "I suggest it Query Time!!! No matter what are you do."
                    );
                    //const result = await time.queryTime();
                    //logResult(result);
                    rl.close();
                    resolve("CloseBt122$43");
                });
            });
        } catch (error) {
            reject(error);
        }
    });

    promise.then((x) => {
        console.log(`Kono process wa owari da. : ${x}`);
    });
}

function logResult(time) {
    console.log(`query result : ${JSON.stringify(time[0])}`);

    // * How to convert bigint (Unix) to date time
    console.log(
        `unix time result : ${dayjs(time[0].time_long * 1000).format()}`
    );
}

function test(d) {
    d = dayjs(d).add(1, "hour");
    console.log(d.format());
}

function bootstrap(callback) {
    app.listen(port, () => {
        console.log(`Server Start at Port ${port}`);
        callback?.();
    });
}

function pingTest() {
    const host = "192.168.10.171";
    ping.sys.probe(host, (active) => {
        var info = active
            ? "IP " + host + " = Active"
            : "IP " + host + " = Non-Active";
        console.log(info);
    });
}

async function testing() {
    const host = "http://192.168.10.141:9000/api/Shift/GetShiftAll";
    const p = [];
    for (let i = 0; i < 10; i++) {
        const promise = new Promise((resolve, reject) => {
            axios.get(host).then((x) => {
                resolve(x.data);
            });
        });
        p.push(promise);
    }

    Promise.all(p)
        .then((values) => {
            console.log(values);
        })
        .catch((err) => {
            console.log(err);
        });
}

async function testTTT(str, callback = null) {
    let plus = str;
    callback?.(plus);
}

bootstrap(main);

// console.log(dayjs().local().format());
// console.log(dayjs().format());
// testing();
