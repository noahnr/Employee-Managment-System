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
// this fucntion allows users to view employees by manager.
let viewEmployeesManager = () => {
  connection.query("SELECT * FROM employee ORDER BY manager_id", (err, answer) => {
      if (err) throw err;
      console.log("all employees by manager id");
      console.table(answer);
  });
  beginPrompt();
}

let viewRoles = () => {
  var query = "SELECT * FROM emprole";
  connection.query(query, (err, answer) => {
      if (err) throw err;
      console.log("All employees currently employed");
      console.table(answer);
  });
  beginPrompt();
}

let addRole = () => {
  connection.query("SELECT * FROM emprole", (err, results) => {
      inquirer.prompt([
          {
              name: "emproleid",
              type: "input",
              message: "Enter desired role id# Greater then 8"
          },
          {
                  name: "roleTitle",
                  type: "input",
                  message: "Enter name of new role"
              },
              {
                  name: "roleSalary",
                  type: "input",
                  message: "Enter the salary amount"
              },
              {
                  name: "roleDeptID",
                  type: "rawlist",
                  choices: function () {
                      var choiceArray = [];
                      for (var i = 0; i < results.length; i++) {
                          choiceArray.push(results[i].department_id);
                      }
                      return choiceArray
                  }

              }
          ])
          .then((answer) => {
              connection.query("INSERT INTO emprole SET ?", {
                      id: answer.emproleid,
                      title: answer.roleTitle,
                      salary: answer.roleSalary,
                      department_id: answer.roleDeptID
                  }),
                  (err) => {
                      if (err) throw err;
                  }
              console.log("Successfully added role")
              beginPrompt();
          })
  }); 
}

