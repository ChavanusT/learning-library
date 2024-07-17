const { IsolationLevel } = require("@sequelize/core");
const sequelize = require("sequelize");
const { LOCK } = require("sequelize");

let TTNus;
async function startSequelize() {
    const db = new sequelize.Sequelize(
        "GO_HRIS",
        "admindb99",
        "ktH&g2j54*df%0P",
        {
            host: "192.168.20.40",
            dialect: "mssql",
            dialectOptions: { requestTimeout: 300000 },
            define: {
                timestamps: false,
            },
        }
    );

    await db.authenticate();

    TTNus = db.define("Test_Transaction_Nus", {
        id: {
            type: sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: sequelize.DataTypes.STRING,
        age: sequelize.DataTypes.INTEGER,
        tel: sequelize.DataTypes.STRING,
    });

    return db;
}

async function testTransaction(db, time) {
    //const t = await db.transaction();

    try {
        let id = 0;
        await db.transaction(
            {
                isolationLevel:
                    sequelize.Transaction.ISOLATION_LEVELS.REPEATABLE_READ,
            },
            async (t) => {
                // your transactions
                const a = await TTNus.create(
                    {
                        name: "alice123",
                        age: 5,
                        tel: "099999999",
                    },
                    {
                        fields: ["name", "age", "tel"],
                        transaction: t,
                    }
                );

                const sleep = (ms) =>
                    new Promise((resolve) => setTimeout(resolve, ms));
                await sleep(10000).finally(() => {
                    console.log("Complete");
                });

                const b = await TTNus.create(
                    {
                        name: "aliceBaka",
                        age: 10,
                        tel: "099999999",
                    },
                    {
                        fields: ["name", "age", "tel"],
                        transaction: t,
                    }
                );
            }
        );
    } catch (error) {
        console.log(error);
        //await t.rollback();
    }
}

async function testQuery(db) {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await sleep(1000).finally(() => {
        console.log("Complete");
    });
    try {
        let id = 0;
        await db.transaction(
            {
                isolationLevel:
                    sequelize.Transaction.ISOLATION_LEVELS.REPEATABLE_READ,
            },
            async (t) => {
                await TTNus.findAll({
                    transaction: t,
                    skipLocked: true,
                });
            }
        );
    } catch (error) {
        console.log(error);
    }
}

module.exports = { startSequelize, testTransaction, testQuery };
