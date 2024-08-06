const { Time, DateTime2, DateTimeOffset } = require("mssql");
const orm = require("typeorm");

const dataRepo = {
    time: null,
};

const timeEntity = new orm.EntitySchema({
    name: "Time",
    tableName: "TimeTest_Not_Use_In_PROD",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        test_date: { type: "datetime2", default: new Date() },
        time: { type: "time" },
        time_offset: { type: "datetimeoffset" },
        time_long: { type: "bigint" },
    },
});

async function sqlConnect() {
    const AppDataSource = new orm.DataSource({
        type: "mssql",
        host: "192.168.20.40",
        port: 1433,
        username: "admindb99",
        password: "ktH&g2j54*df%0P",
        database: "GO_HRIS",
        logging: false,
        entities: [timeEntity],
        ssl: false,
        synchronize: false,
        options: {
            encrypt: false,
        },
    });

    await AppDataSource.initialize().then((r) => {
        console.log("Connect at db");
    });

    return AppDataSource;
}

async function queryTime(db) {
    const timeData = await dataRepo.time.find();
    return timeData;
}

async function insertTime(dateTime2, time, offset, timeLong) {
    const insert = {
        test_date: dateTime2,
        time: time,
        time_offset: offset,
        time_long: timeLong,
    };

    await dataRepo.time.save(insert);
}

async function start() {
    try {
        const db = await sqlConnect();
        initDataRepo(db);
        return db;
    } catch (error) {
        console.log(`Error at :` + error);
    }
}

function initDataRepo(db) {
    dataRepo.time = db.getRepository("Time");
}

module.exports = { start, queryTime, insertTime };
