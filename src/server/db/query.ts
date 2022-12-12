import { questionBlock } from "../server";

const mysql = require("mysql");
const pool  = mysql.createPool({
  host: "us-cdbr-east-06.cleardb.net",
  user: "b76f4d790591b3",
  password: "4f62dde1",
  database: "heroku_02b3f4e1c86199e",
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