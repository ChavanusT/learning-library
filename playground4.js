const sequelize = require("sequelize");

async function startSequelize() {
    const db = new sequelize.Sequelize(
        "GO_HRIS",
        "admindb99",
        "ktH&g2j54*df%0P",
        {
            host: "192.168.20.40",
            dialect: "mssql",
            dialectOptions: { requestTimeout: 300000 },
        }
    );

    await db.authenticate();
    return db;
}

async function testTransaction(db, time) {
    const t = await db.transaction();

    try {
        await db.query(
            `insert into Test_Transaction_Nus (
            name , age , tel) values ('a' , 1 , '0999999999')`,
            { transaction: t }
        );

        const last = await db.query(
            `insert into TimeTest_Not_Use_In_PROD (
            test_date, time , time_offset , time_long) values (
            '${time.test_date}' , '${time.time}' , '${time.time_offset}' ,
            '${time.time_long}')`,
            {
                transaction: t,
            }
        );
        t.afterCommit(() => {
            console.log(last);
        });
        await t.commit();
    } catch (error) {
        console.log(error);
        await t.rollback();
    }
}

module.exports = { startSequelize, testTransaction };
