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

async function main() {
    //L();
    //cds();
    await time.start();
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
                    // const timestamp = dayjs().unix();
                    const timeTest = dayjs().format("HH:mm:ss.SSS");
                    const date = dayjs().tz(dayjs.tz.guess());
                    const offset = date.format("Z");
                    const dateTimeOffset = date.format(
                        `YYYY-MM-DD HH:mm:ss.SSS ${offset}`
                    );

                    console.log(dateTime2, timeTest, dateTimeOffset);
                    await time.insertTime(dateTime2, timeTest, dateTimeOffset);
                } else {
                    console.log("No insert Time...");
                }

                rl.question("Want to Query ?", async (e) => {
                    console.log(
                        "I suggest it Query Time!!! No matter what are you do."
                    );
                    const result = await time.queryTime();
                    logResult(result);
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
    // const buffer = Buffer.from(time[0].test_time_stamp);
    // const bigInt = buffer.readBigInt64BE();
    // console.log(bigInt);
    // const timestamp = dayjs.unix(Number(bigInt) * 1000);
    // console.log(timestamp.format());
}

function bootstrap(callback) {
    app.listen(port, () => {
        console.log(`Server Start at Port ${port}`);
        callback?.();
    });
}

function pinginy() {
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

bootstrap(main);

// testing();
