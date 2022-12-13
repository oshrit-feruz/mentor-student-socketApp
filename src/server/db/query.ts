import { questionBlock } from "../server";
import config from "./dbConfig";
const mysql = require("mysql");
const pool = mysql.createPool({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
});
// queries middleware to the database.

export function questionsList() {
  let query = `SELECT * from codeBlock`;
  return new Promise((resolve, reject) => {
    pool.query(query, (err: Error, res: questionBlock[], fields: any) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}
