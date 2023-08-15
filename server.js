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
    //   if(choices.options === "Add Employee") {
    //     addEmployee();
    //   }
      if(choices.options === "Add Role") {
        addRole();
      } 
      if(choices.options === "Add Department") {
        addDepartment();
      }
    //   if(choices.options === "Update Employee Role") {
    //     updateRole();
    //   }
      // if(choices.options === "Delete Employee") {
      //   deleteEmployee();
      // }
      // if(choices.options === "Delete Department") {
      //   deleteDepartment();
      // }
      // if(choices.options === "Delete Role") {
      //   deleteRole();
      // }
      if(choices.options === "Quit") {
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
    init();
  }); 
};


//====================View table of all employees=================\\
function employees() {
  db.query(query_employee, (err, results) => {
    if (err) throw err;
    console.log("Viewing all employees:");
    console.table(results);
    init();
  });
};


//====================View table of all roles===================\\
function roles() {
  db.query(query_role, (err, results) => {
    if (err) throw err;
    console.log("Viewing all roles:");
    console.table(results);
    init();
  });
};


//====================To add a new department=================\\
function addDepartment() {
  inquirer.prompt([
    {
      name: 'dept_name',
      type: 'input', 
      message: "Enter new department name:",
      validate: dept_name => {
        if (dept_name) {
            return true;
        } else {
            console.log('Please enter a department');
            return false;
        }
      }
    }
  ]).then(answer => {
      const sql = `INSERT INTO department (dept_name) VALUES (?)`;
      db.query(sql, answer.dept_name, (err, result) => {
        if (err) throw err;
        console.log('Added ' + answer.dept_name + " to departments!"); 

        departments();
        init();
    });
  });
}

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
function addRole() {
  db.query(query_department, (err, res) => {
    if (err) throw err;
    let departmentList = res.map(department => ({name: department.dept_name, value: department.id }));
    inquirer.prompt([
        {
        name: 'role',
        type: 'input',
        message: 'Enter a role name you want to add:'   
        },
        {
        name: 'salary',
        type: 'input',
        message: 'Enter the salary of the role:'   
        },
        {
        name: 'dept_name',
        type: 'rawlist',
        message: 'Which department do you want to add the new role to?',
        choices: departmentList,
        },
    ]).then((answers) => {
        db.query(`INSERT INTO role SET ?`, 
        {
            role: answers.role,
            salary: answers.salary,
            dept_id: answers.dept_name,
        },
        (err, res) => {
            if (err) throw err;
            console.log(`\n ${answers.role} successfully added to database! \n`);
            roles();
        });
        init();
    });
  })
};

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
      
    
      
