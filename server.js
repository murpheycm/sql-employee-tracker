//Required package installation
const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();

//CLI Application questions for navigating database
const promptUser = () => {
  inquirer.prmopt([
    {
        type: "list",
        name: "options",
        message: "What would you like to do? (Use arrow keys to navigate)",
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
    }]).then((answers) => {
      const { choices } = answers; 
      //'If' loops for each CLI choice
      if(choices === "View All Employees") {
        employees();
      }
      if(choices === "View All Departments") {
        departments();
      }
      if(choices === "View All Roles") {
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
      if(choices === "Update Department") {
        updateDepartment();
      }
      if(choices === "Update Employee") {
        updateEmployee();
      }
      if(choices === "Delete Employee") {
        deleteEmployee();
      }
      if(choices === "Delete Department") {
        deleteDepartment();
      }
      if(choices === "Delete Role") {
        deleteRole();
      }
      if(choices === "Quit") {
        connection.end();
      };
    });
};


promptUser();
      
    
      
