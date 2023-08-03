//Required package installation
const inquirer = require("inquirer");
const mysql = require('mysql2');

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
    }).then((answers) => {
      const { choices } = answers; 

      if(choices === "View All Employees") {
        function();
      },
      if(choices === "View All Departments") {
        function();
      },
      if(choices === "View All Roles") {
        function();
      },
      if(choices === "Add Employee") {
        function();
      },
      if(choices === "Add Role") {
        function();
      },
      if(choices === "Add Department") {
        function();
      },
      if(choices === "Update Employee Role") {
        function();
      },
      if(choices === "Update Department") {
        function();
      },
      if(choices === "Update Employee") {
        function();
      },
      if(choices === "Delete Employee") {
        function();
      },
      if(choices === "Delete Department") {
        function();
      },
      if(choices === "Delete Role") {
        function();
      },
      if(choices === "Quit") {
        function();
      };
  };
};

      
    
      
