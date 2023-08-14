//Required package installation
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cliTable = require('cli-table');
// const sequelize = require('./config/connection');

const query_department = 'SELECT * FROM department';
const query_employee = 'SELECT * FROM employee';
const query_role = 'SELECT * FROM role';
const table = new cliTable();
// const table_department = 'department';
// const table_employee = 'employee';
// const table_role = 'role';

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

// db.connect(err => {
//   if (err) throw err;
//   console.log('connected as id ' + connection.threadId);
// });

db;

const questions = [
  {
    type: "list",
    name: "options",
    message: "What would you like to do? (Use arrow keys to navigate and 'enter' key to select)",
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

//CLI Application questions for navigating database
function init (){
  inquirer.prompt(questions).then(function(choices) {
      console.log(choices.options);

      // //'If' loops for each CLI choice
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
      // if(choices === "Update Employee Role") {
      //   updateRole();
      // }
      // if(choices === "Update Department") {
      //   updateDepartment();
      // }
      // if(choices === "Update Employee") {
      //   updateEmployee();
      // }
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


function employees() {
  db.query(query_employee, (err, results) => {
    if (err) {
      console.error("ERROR", err);
    }else {
      console.log("Viewing all employees:");
      console.table(results);
    };
  //returns user to the menu after displaying response
  init();
  });
}

function departments() {
  db.query(query_department, (err, results) => {
    if (err) {
      console.error("ERROR", err);
    }else {
      console.log("Viewing all departments:");
      console.table(results);
    };
  init();
  });
}

function roles() {
  db.query(query_role, (err, results) => {
    if (err) {
      console.error("ERROR", err);
    }else {
      console.log("Viewing all roles:");
      console.table(results);
    };
  init();
  });
}

// function addDepartment() {
//   db.query(, (err, results) => {
//     if (err) {
//       console.error("ERROR", err);
//     }else {
//       console.log("Added new department:");
//       console.table(results);
//     };
//   init();
//   });
// }

function addEmployee() {
  inquirer.prompt([
    {
      type:'input',
      name:'first_name',
      message:'Enter first name:',
    },
    {
      type:'input',
      name:'last_name',
      message:'Enter last name:',
    },
    {
      type:'list',
      name:'role',
      message:'Please select employee role:',
      choices:
      [
        "customer_representative",
        "software_engineer",
        "director_HR",
        "HR_representative",
        "contract_officer"
      ]
    },
    {
      type:'input',
      name:'role_id',
      message:'Enter role ID # (1-9):',
    },
    {
      type:'input',
      name:'dept_id',
      message:'Enter department ID # (1-9):',
    },
    {
      type:'input',
      name:'manager_id',
      message:'Enter manager ID # (1-9):',
    },
    {
      type:'input',
      name:'salary',
      message:'Enter gross annual salary:',
    }
  ]).then(function (answer){
    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, 
      [
        answer.first_name, 
        answer.last_name, 
        answer.role_id, 
        answer.manager.id
      ], 
      (err, result) => {
        if (err) throw err;
        console.log(`Added ${answers.firstName} ${answers.lastName} to the database.`)

        console.table(response);
    

    init();
  });
};

// function addRole() {
//   db.query(, (err, results) => {
//     if (err) {
//       console.error("ERROR", err);
//     }else {
//       console.log("Added new role:");
//       console.table(results);
//     };
//   init();
//   });
// }









init();
      
    
      
