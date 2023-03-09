import { Connection, Request } from "tedious";
import { Sequelize } from "sequelize";
import Employee from "../models/employee.js";
import Task from "../models/task.js";

const db = {};
const dbName = "TRAVEEY-TASK";
const host = "localhost";
const dbUsername = "";
const dbPassword = "";

initialize();

async function initialize() {
  const dialect = "mssql";

  await ensureDbExists(dbName);

  const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
    host,
    dialect,
  });

  db.Employee = Employee(sequelize);
  db.Task = Task(sequelize);

  await sequelize.sync();
}

async function ensureDbExists(dbName) {
  return new Promise((resolve, reject) => {
    const connection = new Connection({
      server: host,
      options: {
        port: 1433,
        trustServerCertificate: true,
      },
      authentication: {
        type: "default",
        options: {
          userName: dbUsername,
          password: dbPassword,
        },
      },
    });
    connection.connect((err) => {
      if (err) {
        console.error(err);
        reject(`Connection Failed: ${err.message}`);
      }

      const createDbQuery = `IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = '${dbName}') CREATE DATABASE [${dbName}];`;
      const request = new Request(createDbQuery, (err) => {
        if (err) {
          console.error(err);
          reject(`Create DB Query Failed: ${err.message}`);
        }

        resolve();
      });

      connection.execSql(request);
    });
  });
}

export default db;
