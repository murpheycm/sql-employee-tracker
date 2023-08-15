//==================Dependencies===================\\
const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();

const query_department = 'SELECT * FROM department';
const query_employee = 'SELECT * FROM employee';
const query_role = 'SELECT * FROM role';

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
);

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
      // "Delete Employee",
      "Delete Department",
      // "Delete Role",
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
      if(choices.options === "Add Employee") {
        addEmployee();
      }
      if(choices.options === "Add Role") {
        addRole();
      } 
      if(choices.options === "Add Department") {
        addDepartment();
      }
      if(choices.options === "Update Employee Role") {
        updateRole();
      }
      // if(choices.options === "Delete Employee") {
      //   deleteEmployee();
      // }
      if(choices.options === "Delete Department") {
        deleteDepartment();
      }
      // if(choices.options === "Delete Role") {
      //   deleteRole();
      // }
      if(choices.options === "Quit") {
        db.end();
        console.log('\n You have exited the employee management program. Enter "node server.js" to reopen application. \n');
        return;
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
        // init();
    });
  });
}

//====================To add a new employee=================\\
function addEmployee() {
  db.query(query_role, (err, res) => {
    if (err) throw err;
    let roles = res.map(role => ({name: role.role, value: role.id }));
        inquirer.prompt([
            {
                name: 'first_name',
                type: 'input',
                message: 'Enter the first name of the new employee:'
            },
            {
                name: 'last_name',
                type: 'input',
                message: 'Enter the last name of the new employee:'
            },
            {
                name: 'role',
                type: 'rawlist',
                message: 'Select the role of the new employee:',
                choices: roles,
            },
            {
                name: 'manager_id',
                type: 'input',
                message: 'Enter the appropriate manager ID number for the new employee:',
            }
        ]).then((answers) => {
            db.query(`INSERT INTO employee SET ?`, 
            {
                first_name: answers.first_name,
                last_name: answers.last_name,
                role_id: answers.role,
                manager_id: answers.manager_id,
            }, 
            (err, res) => {
                if (err) throw err;
                console.log(`\n ${answers.first_name} ${answers.last_name} successfully added to database! \n`);
                employees();
                // init();
            })
        })
    })
};

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
            // init();
        });
    });
  })
};

//====================To update an existing employee's role=================\\
function updateRole() {
  db.query(query_role, (err, res) => {
    if (err) throw err;
    let roles = res.map(role => ({name: role.role, value: role.id }));
    db.query(query_employee, (err, res) => {
        if (err) throw err;
        let employeeList = res.map(employee => ({name: employee.first_name + ' ' + employee.last_name, value: employee.id }));
        inquirer.prompt([
            {
                name: 'employee',
                type: 'rawlist',
                message: 'Select the employee you would like to update:',
                choices: employeeList,
            },
            {
                name: 'newRole',
                type: 'rawlist',
                message: 'Select new role:',
                choices: roles,
            },
        ]).then((answers) => {
            db.query(`UPDATE employee SET ? WHERE ?`, 
            [
              {
                  role_id: answers.newRole,
              },
              {
                  id: answers.employee,
              },
            ], 
            (err, res) => {
                if (err) throw err;
                console.log(`\n Successfully updated employee's role in the database! \n`);
                employees();
                // init();
            })
        })
    })
  })
};


//====================To delete a department=================\\
function deleteDepartment() {
  db.query(query_department, (err, res) => {
      if (err) throw err;
      let departmentList = res.map(department => ({name: department.dept_name, value: department.id }));
      inquirer.prompt([
          {
          name: 'dept_name',
          type: 'rawlist',
          message: 'Select the department you would like to delete:',
          choices: departmentList,
          },
      ]).then((answers) => {
          db.query(`DELETE FROM department WHERE ?`, 
          [
            {
                id: answers.dept_name,
            },
          ], 
          (err, res) => {
              if (err) throw err;
              console.log(`\n Successfully removed the department from the database! \n`);
              departments();
              // init();
          })
      })
  })
}


//====================Starts the CLI application from login=================\\
init();
      
    
      
