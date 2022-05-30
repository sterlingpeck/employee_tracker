require("dotenv").config();
const inquirer = require("inquirer");
const db = require("./data/link.js");

let departments = [];
let employees = [];

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

const getEmployeesInit = () => {
  const sql = `SELECT * FROM employees`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.error(err);
    }
    let tempArray = [];
    for (let i = 0; i < rows.length; i++) {
      let tempObject = {};
      tempObject.value = rows[i].id;
      tempObject.name = rows[i].first_name + " " + rows[i].last_name;
      tempArray.push(tempObject);
    }
    employees = tempArray;
  });
};

const beginPrompt = () => {
  return inquirer
    .prompt({
      type: "list",
      name: "mainMenu",
      message: "Options:",
      choices: [
        "View Departments",
        "View Employees",
        "Add a department",
        "Add an employee",
        "Quit",
      ],
    })
    .then((userChoice) => {
      return userChoice;
    });
};

const addDepartmentPrompt = (callback) => {
  return inquirer
    .prompt({
      type: "input",
      name: "name",
      message: "Please enter new department name:",
    })
    .then((response) => {
      addDepartment(response, callback);
    });
};

const addEmployeePrompt = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "Please enter the employee's first name:",
      },
      {
        type: "input",
        name: "lastName",
        message: "Please enter the employee's last name:",
      },
      {
        type: "list",
        name: "role",
        message: "Please enter the employee's role:",
        choices: roles,
      },
      {
        type: "list",
        name: "manager",
        message: "Please select the employee's manager:",
        choices: employees,
      },
    ])
    .then((response) => {
      addEmployee(response);
    });
};

const getDepartments = () => {
  const sql = `SELECT * FROM departments`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.error(err);
    }
    console.table(rows);
    initialize();
  });
};

const getEmployees = () => {
  const sql = `SELECT emp.id, emp.first_name, emp.last_name, roles.job_title, CONCAT(man.first_name, " ", man.last_name) AS manager_name FROM employees AS emp LEFT JOIN roles ON emp.role_id = roles.id LEFT JOIN employees AS man ON emp.manager_id = man.id;`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.error(err);
    }
    console.table(rows);
    initialize();
  });
};

const addDepartment = (departmentObject) => {
  const sql = `INSERT INTO departments (name) VALUES (?)`;
  const params = [departmentObject.name];
  db.query(sql, params, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Department has been added.");
    initialize();
  });
};

const addEmployee = (employeeObject) => {
  const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
  const params = [
    employeeObject.firstName,
    employeeObject.lastName,
    employeeObject.role,
    employeeObject.manager,
  ];
  db.query(sql, params, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Employee has been added.");
    initialize();
  });
};

const quit = () => {
  console.log("Goodbye!");
  process.exit();
};

const initialize = () => {
  getDepartmentsInit();
  getEmployeesInit();
  beginPrompt().then((userChoice) => {
    switch (userChoice.mainMenuChoice) {
      case "View all departments":
        getDepartments();
        break;
      case "View all employees":
        getEmployees();
        break;
      case "Add a department":
        addDepartmentPrompt();
        break;
      case "Add an employee":
        addEmployeePrompt();
        break;
      case "Update an employee role":
        updateEmployeeRolePrompt();

      case "Quit":
        quit();
    }
  });
};

initialize();
