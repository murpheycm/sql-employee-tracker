-- Connecting with the databasein schema.js
USE employees_db;

-- Adding data to 'department' table in employees_db
INSERT INTO department (dept_name)
VALUES ("customer_service"),
        ("information_technology"),
        ("human_resources"),
        ("contract_services");


-- Adding data to 'role' table in employees_db
INSERT INTO role (title, salary, dept_id)
VALUES ("customer_representative", 50000, 1),
    ("software_engineer", 150000, 2),
    ("director_HR", 130000, 3),
    ("HR_representative", 60000, 3),
    ("senior_contract_officer", 100000, 4);


-- Adding data to 'employee' table in employees_db
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Milo", "Taylor", 1, 3),
        ("Tara", "Green", 1, 3),
        ("Nathan", "Helix", 2, 1),
        ("Andrew", "Johns", 2, 1),
        ("Jess", "Davidson", 3, 2),
        ("Hubert", "Snead", 4, 4),
        ("Dale", "Schwab", 4, 4),
        ("Savannah", "Jones", 5, 2);

SELECT *
FROM department;

SELECT *
FROM employee;

SELECT *
FROM role;
