const mysql = require("mysql");
const inquirer = require("inquirer");
// const createTable = require("console.table");

const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Rootbeer1",
    database: "employTrack_db"
});

connection.connect((err) => {
    if (err) throw err;
    beginPrompt();
});
let beginPrompt = () => {
  inquirer
      .prompt({
          name: "action",
          type: "list",
          message: "what would you like to do",
          choices: [
              "View all employees",
              "View all departments",
              "View all employees by manager id",
              "Add employee",
              "Remove employee",
              "Remove manager",
              "View all roles",
              "Add role",
              "Remove role",
              "Exit"
          ]
      }) // begin switch statements for prompted answers
      .then((answer) => {
          switch (answer.action) {
              case "View all employees":
                  viewEmployees();
                  break;

              case "View all departments":
                  viewEmployeesDept();
                  break;

              case "View all employees by manager id":
                  viewEmployeesManager();
                  break;

              case "Add employee":
                  addEmployee();
                  break;

              case "Remove employee":
                  removeEmployee();
                  break;

              case "Remove manager":
                  removeManager();
                  break;

              case "View all roles":
                  viewRoles();
                  break;

              case "Add role":
                  addRole();
                  break;

              case "Remove role":
                  removeRole();
                  break;

              case "Exit":
                  connection.end();
                  break;
          }
      });
}
let viewEmployees = () => {
  var query = "SELECT * FROM employee";
  connection.query(query, (err, answer) => {
      if (err) throw err;
      console.log("All employees currently employed");
      console.table(answer);
  });
  beginPrompt();
}
// this function allows users to view all dept.
let viewEmployeesDept = () => {
  connection.query("SELECT * FROM department", (err, answer) => {
      if (err) throw err;
      console.log("All departments");
      console.table(answer);
  });
  beginPrompt();
}
