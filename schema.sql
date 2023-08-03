CREATE TABLE department(
  id INT PRIMARY KEY,
  name VARCHAR(30),
);

CREATE TABLE role(
  id INT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT
);

CREATE TABLE employee(
  id INT PRIMARY KEY,
  firstname VARCHAR(30),
  lastname VARCHAR(30),
  role_id INT,
  manager_id INT
);
