-- Populate department table
INSERT INTO department (name) VALUES
  ('Sales'),
  ('Engineering'),
  ('Marketing'),
  ('Finance');

-- Populate role table
INSERT INTO role (title, salary, department_id) VALUES
  ('Sales Manager', 80000, 1),
  ('Sales Associate', 50000, 1),
  ('Software Engineer', 90000, 2),
  ('Marketing Specialist', 60000, 3),
  ('Financial Analyst', 70000, 4);

-- Populate employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Smith', 2, 1),
  ('Michael', 'Johnson', 3, 1),
  ('Emily', 'Williams', 4, NULL),
  ('David', 'Brown', 5, NULL);
