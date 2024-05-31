const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
const utc = require("dayjs/plugin/utc");
const short = require("short-uuid");
const ping = require("ping");

dayjs.extend(customParseFormat);
dayjs.extend(utc);

const express = require("express");
const { default: axios } = require("axios");
const app = express();
const port = 3000;

function main() {
    const translator = short();
    translator.maxLength = 8;

    const id = translator.generate();
    console.log(id);
    console.log(translator.maxLength);
}

function bootstrap() {
    app.listen(port, () => {
        console.log(`Server Start at Port ${port}`);
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

main();
bootstrap();
testing();
