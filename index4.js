const _ = require("lodash");
const express = require("express");

function main() {
    let arr = ["a", "b", "c"];
    let data = [{ code: "a" }, { code: "e" }, { code: "b" }];

    const f = data.filter((x) => arr.includes(x.code));
    const removeExist = _.remove(data, (x) => arr.includes(x.code));
    console.log(f);
    console.log(removeExist);
    console.log(data);
}

// main();
