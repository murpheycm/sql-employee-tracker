//==================Dependencies===================\\
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cliTable = require('cli-table');
//const dotenv = require('dotenv');

const query_department = 'SELECT * FROM department';
const query_employee = 'SELECT * FROM employee';
const query_role = 'SELECT * FROM role';
// const table = new cliTable();

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'rootpw',
    //password: process.env.PASSOWRD,
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
);

//==============Connection Check===============\\
// db.connect(err => {
//   if (err) throw err;
//   console.log('connected as id ' + connection.threadId);
// });

db;

//==================Inquirer Prompt Questions List=============\\
const questions = [
  {
    type: "list",
    name: "options",
    message: "What would you like to do? (Use arrow keys to navigate and the 'enter' key to select)",
    choices: 
    [
      "View All Employees",
      "View All Departments",
      "View All Roles",
      "Add Employee",
      "Add Role",
      "Add Department",
      "Update Employee Role",
      "Update Department",
      "Update Employee",
      "Delete Employee",
      "Delete Department",
      "Delete Role",
      "Quit",
    ],
  }
];

//================CLI Application Navigation Using the Prompt Questions===============\\
function init (){
  inquirer.prompt(questions).then(function(choices) {
      console.log(choices.options);
      if(choices.options === "View All Employees") {
        employees();
      }
      if(choices.options === "View All Departments") {
        departments();
      }
      if(choices.options === "View All Roles") {
        roles();
      }
      if(choices === "Add Employee") {
        addEmployee();
      }
     if(choices === "Add Role") {
        addRole();
      } 
      if(choices === "Add Department") {
        addDepartment();
      }
      if(choices === "Update Employee Role") {
        updateRole();
      }
      // if(choices === "Delete Employee") {
      //   deleteEmployee();
      // }
      // if(choices === "Delete Department") {
      //   deleteDepartment();
      // }
      // if(choices === "Delete Role") {
      //   deleteRole();
      // }
      if(choices === "Quit") {
        db.end();
      };
    });
};

//====================View table of all departments===============\\
function departments() {
  db.query(query_department, (err, results) => {
    if (err) throw err;
    console.log("Viewing all departments:");
    console.table(results);
  };
  //returns user to the menu after displaying response
  init();
  });
}

//====================View table of all employees=================\\
function employees() {
  db.query(query_employee, (err, results) => {
    if (err) throw err;
    console.log("Viewing all employees:");
    console.table(results);
  };
  init();
  });
}

//====================View table of all roles===================\\
function roles() {
  db.query(query_role, (err, results) => {
    if (err) throw err;
    console.log("Viewing all roles:");
    console.table(results);
  };
  init();
  });
}

//====================To add a new department=================\\
// function addDepartment() {
//   inquirer.prompt(
//     {
//       name: "dept_name",
//       type: "input",
//       message: "Enter new department name:"
//     }).then(function(answers) {
//       // db.query(
//       //         "INSERT INTO department SET ?",
//       //         {
//       //           dept_name: answers.dept_name,
//       //         },
//       db.query("INSERT INTO department (name) VALUES (?)", function (err, results) {
//         if (err) throw err;
//         console.log("Added new department:");
//         console.table(results);
//       };
//       init();
//     });
// }

//====================To add a new employee=================\\
// function addEmployee() {
//   inquirer.prompt([
//     {
//       name:'first_name',
//       type:'input',
//       message:'Employee first name:',
//     },
//     {
//       name:'last_name',
//       type:'input',
//       message:'Employee last name:',
//     },
//     {
//       name:'role_id',
//       type:'input',
//       message:"Enter the employee's role ID #:"
//     },
//     {
//       name: 'manager_id',
//       type: 'input', 
//       message: "What is the employee's manager's ID #? (1-9)"
//     }
//     ]).then(function (answer){
//       db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
//         [
//           answer.first_name, 
//           answer.last_name, 
//           answer.role_id, 
//           answer.manager.id
//         ], 
//         function (err, result) {
//           if (err) throw err;
//           console.log(`Added ${answers.firstName} ${answers.lastName} to the database.`)
//           console.table(results);
//       });
//     init();
//     });
// };

//====================To add a new role===================\\
// function addRole() {
//   inquirer.prompt([
//     {
//       name:"title",
//       type:"input",
//       message:"Enter role name:"
//     },
//     {
//       name: "salary",
//       type: "input",
//       message: "Enter the salary for this role:"
//     },
//     {
//       name: "dept_id",  
//       type: "input",
//       message: "Enter the department id number:",
//     }
//     ]).then(function(answers) {
//       db.query('INSERT INTO role (title, salary, dept_id) VALUES (?,?,?)', 
//         [
//           answer.title,
//           answer.salary,
//           answer.dept_id
//         ], 
//         function(err, res) {
//           if (err) throw err;
//           console.log("Added new role:");
//           console.table(results);
//         };
//     });
//     init();
// };

//====================To update an existing employee's role=================\\
// function updateRole() {
//    db.query("SELECT employee.first_name, employee.last_name FROM employee JOIN role ON employee.role_id = role.id;",
//     function(err,res) {
//       if (err) throw err;
//       console.log(res);
      
//   inquirer.prompt([
//     {   
//     name:"first_name",
//     type:"input",
//     message"Enter employee's first name:"
//     },
//     {   
//     name:"last_name",
//     type:"input",
//     message"Enter employee's last name:"
//     },
//   ]).then(function(answers) {
//     db.query("UPDATE employee SET WHERE ?",
//       [
//         {first_name: val.first_name},
//         {last_name: val.last_name},
//       ];
//     function(err) {
//       if (err) throw err;
//       console.table(results)
//   });
//   init();
// };


//====================Starts the CLI application from login=================\\
init();
      
    
      
