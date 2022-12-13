import mysql from "mysql";
import config from "./dbConfig";
// Questions data
const questionsArr = [
  {
    title: "sum of arrays",
    description:
      "You will be given an array of several arrays that each contain integers and your goal is to write a function that will sum up all the numbers in all the arrays. For example, if the inp Solve without and with reduce.",
    code: `function sum_array(arr) {
        var sum = 0;
        for (var i = 0; i < arr.length; i++) {
          for (var j = 0; j < arr[i].length; j++) {
            sum = arr[j][i];
          }
        }
        return sum;
      }`,
    solution: `function sum_array(arr) {
      let sum = 0;
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
          sum += arr[i][j];
        }
      }
      return sum;
    }`,
  },
  {
    title: "operators mess",
    description:
      "You will be given a several exercizes that will use diffrent operator to solve it. change the operator to solve the exercize.",
    code: `function operators() {
      return (
        3 - 7 === 21 &&
        88 * 11 === 0 &&
        63 % 1 === 63 &&
        2 + 14 === 28 &&
        51 % 30 === 21 &&
        41 / 4 === 1
      );
    }`,
    solution: `function operators() {
      return (
        3 * 7 === 21 &&
        88 % 11 === 0 &&
        63 / 1 === 63 &&
        2 * 14 === 28 &&
        51 - 30 === 21 &&
        41 % 4 === 1
      );
    }`,
  },
  {
    title: "tick tack",
    description:
      "You will be given a number N that represents where the minute hand currently is on a clock. Your program should return the angle that is formed by the minute hand and the 12 o'clock mark on the clock. replace the question mark to the correct number.",
    code: `function simpleClockAngle(num) {
      return ? * num;
    }`,
    solution: `function simpleClockAngle(num) {
      return 6 * num;
    }`,
  },
  {
    title: "fibonacci sequence",
    description:
      "you need to correct this function to return the nth number in the fibonacci sequence (only add do not delete any code)",
    code: `function fibonacci(index) {
      let pre = 0,
        current = 0;
    
      for (let i = 0; i < index; i++) {
        if (current === 0) {
          current = 1;
        } else if (current === 1) {
          pre = 1;
        } else {
          const next = current + pre;
          pre = current;
          current = next;
        }
      }
      return current;
    }`,
    solution: `function fibonacci(index) {
      let pre = 0,
        current = 0;
    
      for (let i = 0; i < index; i++) {
        if (current === 0) {
          current = 1;
        } else if (current === 1 && pre === 0) {
          pre = 1;
        } else {
          const next = current + pre;
          pre = current;
          current = next;
        }
      }
      return current;
    }`,
  },
];

// Connect to DB

export const sqlConnection = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
});

sqlConnection.connect(function (err: Error) {
  if (err) throw err;
  // create and insert into code block table
  let drop = `DROP TABLE IF EXISTS codeBlock `;
  sqlConnection.query(drop, (err: Error, _res: Response) => {
    err ? console.log(err) : console.log("done");
  });

  let create = `CREATE TABLE codeBlock (
    id INT AUTO_INCREMENT primary key NOT NULL,
    title VARCHAR(100),
    description VARCHAR(1000),
    code VARCHAR(1000),
    solution VARCHAR(1000))`;
  sqlConnection.query(create, (err: Error, _res: Response) => {
    err ? console.log(err) : console.log("done");
  });
  let insert = `INSERT INTO codeBlock ( title, description, code, solution) VALUES (?, ?, ?, ?) `;
  questionsArr.forEach((question) => {
    sqlConnection.query(
      insert,
      [question.title, question.description, question.code, question.solution],
      (err, _res) => {
        err ? console.log(err) : console.log("done");
      }
    );
  });
  let sql = `SELECT * from codeBlock`;
  sqlConnection.query(sql, function (err, res) {
    err ? console.log(err) : console.log(res);
  });
});
