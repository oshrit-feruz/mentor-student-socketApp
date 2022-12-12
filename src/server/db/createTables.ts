const mysql = require("mysql");

// Connect to DB
export const sqlConfig = mysql.createConnection({
  host: "us-cdbr-east-06.cleardb.net",
  user: "b76f4d790591b3",
  password: "4f62dde1",
  database: "heroku_02b3f4e1c86199e",
});

sqlConfig.connect(function (err: Error) {
  if (err) throw err;
  // create and insert into code block table
  let drop = `DROP TABLE IF EXISTS codeBlock `;
  sqlConfig.query(drop, (err: Error, _res: Response) => {
    err ? console.log(err) : console.log("done");
  });

  let create = `CREATE TABLE codeBlock (title VARCHAR(100),description VARCHAR(100),code VARCHAR(100),solution VARCHAR(100))`;
  sqlConfig.query(create, (err: Error, _res: Response) => {
    err ? console.log(err) : console.log("done");
  });
  let insert = `INSERT INTO codeBlock ( title, description, code,solution) VALUES  `;
  let sql = `("sum of arrays","You will be given an array of several arrays that each contain integers and your goal is to write a function that will sum up all the numbers in all the arrays. For example, if the input is [[3, 2], [1], [4, 12]] then your program should output 22 because 3 + 2 + 1 + 4 + 12 = 22. Solve without and with reduce."
   ,"function sum_array(arr) { var sum = 0; for (var i = 0; i < arr.length; i++) {   for (var j = 0; j < arr[i].length; j++) {     sum = arr[i][j];   } } return sum;       }"
                 ,
                 "function sum_array(arr) { var sum = 0; for (var i = 0; i < arr.length; i++) {   for (var j = 0; j < arr[i].length; j++) {     sum = arr[i][j];   } } return sum;      }")`;
  sqlConfig.query(insert + sql, (err: Error, _res: Response) => {
    err ? console.log(err) : console.log("done");
  });
  sql = `("operators mess","You will be given a several exercizes that will use diffrent operator to solve it. change the operator to solve the exercize.", 
                 "function true() {  3 / 7 === 21  88 + 11 === 0  63 % 1 === 63  2 / 14 === 28  51 + 30 === 21  41 - 4 === 1  }"
                   ,
                   "function true() {
                       3 * 7 === 21
                       88 % 11 === 0
                       63 / 1 === 63
                       2 * 14 === 28
                       51 - 30 === 21
                       41 % 4 === 1
                       }")`;
  sqlConfig.query(insert + sql, (err: Error, _res: Response) => {
    err ? console.log(err) : console.log("done");
  });
  sql = `("tick tack","You will be given a number N that represents where the minute hand currently is on a clock. Your program should return the angle that is formed by the minute hand and the 12 o'clock mark on the clock.
                    replace the question mark to the correct number.", 
                    "function simpleClockAngle(num) {
                      return ? * num;
                    }"
                      ,
                      "function simpleClockAngle(num) {
                          return 6 * num;
                        }")`;
  sqlConfig.query(insert + sql, (err: Error, _res: Response) => {
    err ? console.log(err) : console.log("done");
  });
  sql = `SELECT * from codeBlock`;
  sqlConfig.query(sql, function (err: Error, res: Response) {
    err ? console.log(err) : console.log(res);
  });
});
