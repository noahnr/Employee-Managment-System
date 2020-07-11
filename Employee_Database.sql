let removeEmployee = () => {
  connection.query("SELECT * FROM employee", (err, results) => {
      if (err) throw err;
      inquirer
          .prompt([{
              name: "remove",
              type: "input",
              message: "Enter employee ID# you wish to remove"
          }])
          .then((answer) => {
              connection.query("DELETE FROM employee where ?", {
                  id: answer.remove

              });
              console.log("Successfully deleted employee")
              beginPrompt();
          });
  });

}

let removeRole = () => {
  connection.query("SELECT * FROM emprole", (err, results) => {
      if (err) throw err;
      inquirer
          .prompt([{
              name: "remove",
              type: "input",
              message: "Enter role ID# you wish to remove"
          }])
          .then((answer) => {
              connection.query("DELETE FROM emprole where ?", {
                  id: answer.remove

              });
              console.log("Successfully deleted role")
              beginPrompt();
          });
  });

}

let removeManager = () => {
  connection.query("SELECT * FROM employee", (err, results) => {
      if (err) throw err;
      inquirer
          .prompt([{
              name: "remManager",
              type: "input",
              message: "Enter manager ID# you wish to remove (5, 6, 7)"
          }])
          .then((answer) => {
              connection.query("DELETE FROM employee where ?", {
                 manager_id: answer.remManager

              });
              console.log("Successfully deleted manager");
              console.table(answer);
              beginPrompt();
          });
  });

}