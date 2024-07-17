const pg4 = require("./playground4");

async function main() {
    const db = await pg4.startSequelize();
    await pg4.testQuery(db);
}

main();
