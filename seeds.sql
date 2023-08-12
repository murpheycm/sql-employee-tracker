-- Connecting with the databasein schema.js
USE employees_db;

-- Adding data to 'department' table in employees_db
INSERT INTO department (dept_name)
VALUES ("customer_service");

INSERT INTO department (dept_name)
VALUES ("information_technology");

INSERT INTO department (dept_name)
VALUES ("human_resources");

INSERT INTO department (dept_name)
VALUES ("contract_services");


-- Adding data to 'role' table in employees_db
INSERT INTO role (title, salary, dept_id)
VALUES ("customer_representative", 50000, 1);

INSERT INTO role (title, salary, dept_id)
VALUES ("software_engineer", 150000, 2);

INSERT INTO role (title, salary, dept_id)
VALUES ("director_HR", 130000, 3);

INSERT INTO role (title, salary, dept_id)
VALUES ("HR_representative", 60000, 3);

INSERT INTO role (title, salary, dept_id)
VALUES ("senior_contract_officer", 100000, 4);


-- Adding data to 'employee' table in employees_db
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Milo", "Taylor", 1, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tara", "Green", 1, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Nathan", "Helix", 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Andrew", "Johns", 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jess", "Davidson", 3, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Hubert", "Snead", 4, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Dale", "Schwab", 4, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Savannah", "Jones", 5, 2);
