const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
const utc = require("dayjs/plugin/utc");

dayjs.extend(customParseFormat);
dayjs.extend(utc);
console.log("app start");
class AAAA {
  b;
}
class ABBB {
  a = new AAAA();
}
function main() {
  let arrStr = [];
  const loop = 10 ^ 5;
  for (let i = 0; i < loop; i++) {
    const prop = {
      a: i,
    };
    arrStr.push(prop);
  }

  console.time("lo1");
  const size = arrStr.length;
  let sum = 0;
  for (let i = 0; i < size; i++) {
    sum += arrStr[i].a;
  }
  console.timeEnd("lo1");

  console.time("lo2");
  let sum2 = 0;
  arrStr.map((x) => {
    sum2 += x.a;
  });
  console.timeEnd("lo2");

  console.time("lo2");
  let sum3 = 0;
  for (const prop of arrStr) {
    sum3 += prop.a;
  }
  console.timeEnd("lo2");
}

main();
process.exit(0);