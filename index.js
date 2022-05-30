const inquirer = require("inquirer");

let departments = [];

const getDepartmentsInit = () => {
  const sql = `SELECT * FROM departments`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.error(err);
    }
    let tempArray = [];
    for (let i = 0; i < rows.length; i++) {
      let tempObject = {};
      tempObject.value = rows[i].id;
      tempObject.name = rows[i].name;
      tempArray.push(tempObject);
    }
    departments = tempArray;
  });
};

const quit = () => {
  console.log("Goodbye!");
  process.exit();
};

const initialize = () => {
  getDepartmentsInit();
  beginPrompt().then((userChoice) => {
    switch (userChoice.mainMenuChoice) {
      case "View all departments":
        getDepartments();
        break;
      case "Quit":
        quit();
    }
  });
};

initialize();
