const db = require('./connection');

// Function to view all departments
async function viewAllDepartments() {
    try {
      const [rows, fields] = await db.query('SELECT * FROM department');
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Function to add a role
async function addRole(title, salary, department_id) {
    try {
      const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
      await db.query(query, [title, salary, department_id]);
    } catch (error) {
      throw error;
    }
  }

  // Function to view all roles
async function viewAllRoles() {
    try {
      const [rows, fields] = await db.query('SELECT * FROM role');
      return rows;
    } catch (error) {
      throw error;
    }
  }

 // Function to add an employee
async function addEmployee(firstName, lastName, roleId, managerId) {
    try {
      const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
      await db.query(query, [firstName, lastName, roleId, managerId]);
    } catch (error) {
      throw error;
    }
  }
  
  // Function to view all employees
async function viewAllEmployees() {
    try {
      const query = `
        SELECT 
          e.id, 
          e.first_name, 
          e.last_name, 
          r.title AS role_title, 
          d.name AS department_name, 
          r.salary, 
          CONCAT(m.first_name, ' ', m.last_name) AS manager_name
        FROM 
          employee e
        LEFT JOIN 
          role r ON e.role_id = r.id
        LEFT JOIN 
          department d ON r.department_id = d.id
        LEFT JOIN 
          employee m ON e.manager_id = m.id`;
  
      const [rows, fields] = await db.query(query);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Function to update an employee's role
async function updateEmployeeRole(employeeId, roleId) {
    try {
      const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
      await db.query(query, [roleId, employeeId]);
    } catch (error) {
      throw error;
    }
  }

  // Function to add a department
async function addDepartment(name) {
    try {
      const query = 'INSERT INTO department (name) VALUES (?)';
      await db.query(query, [name]);
    } catch (error) {
      throw error;
    }
  }
  
  module.exports = {
    viewAllDepartments,
    addRole,
    viewAllRoles,
    addEmployee,
    viewAllEmployees,
    updateEmployeeRole,
    addDepartment,
  };