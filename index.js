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
  let config = new ABBB();
  config = null;
  p();
}

function p(config) {
  const abc = config?.a?.b ?? "Hello";
  console.log(abc);
}

main();
process.exit(1);
