const inquirer = require('inquirer');
const {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addRole,
  addDepartment,
  addEmployee,
  updateEmployeeRole,
} = require('./db'); // Import functions from db/index.js

// Function to prompt the user with main menu
function promptMainMenu() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Exit',
        ],
      },
    ])
    .then(handleMainAction);
}

// Function to handle the selected action
function handleMainAction(answers) {
  switch (answers.action) {
    case 'View all departments':
      viewDepartments();
      break;
    case 'View all roles':
      viewRoles();
      break;
    case 'View all employees':
      viewEmployees();
      break;
    case 'Add a department':
      promptAddDepartment();
      break;
    case 'Add a role':
      promptAddRole();
      break;
    case 'Add an employee':
      promptAddEmployee();
      break;
    case 'Update an employee role':
      promptUpdateEmployeeRole();
      break;
    case 'Exit':
      console.log('Goodbye!');
      process.exit();
      break;
  }
}

// Function to display departments
async function viewDepartments() {
  try {
    const departments = await viewAllDepartments();
    console.table(departments);
    promptMainMenu();
  } catch (error) {
    console.error('Error viewing departments:', error);
  }
}

// Function to display roles
async function viewRoles() {
  try {
    const roles = await viewAllRoles();
    console.table(roles);
    promptMainMenu();
  } catch (error) {
    console.error('Error viewing roles:', error);
  }
}

// Function to display employees
async function viewEmployees() {
  try {
    const employees = await viewAllEmployees();
    console.table(employees);
    promptMainMenu();
  } catch (error) {
    console.error('Error viewing employees:', error);
  }
}

// Function to prompt adding a department
function promptAddDepartment() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter the department name:',
      },
    ])
    .then(handleAddDepartment);
}

// Function to handle adding a department
async function handleAddDepartment(answers) {
  try {
    await addDepartment(answers.name);
    console.log('Department added successfully!');
    promptMainMenu();
  } catch (error) {
    console.error('Error adding department:', error);
  }
}

// Function to prompt adding a role
function promptAddRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter the role title:',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Enter the role salary:',
      },
      {
        type: 'input',
        name: 'department_id',
        message: 'Enter the department ID:',
      },
    ])
    .then(handleAddRole);
}

// Function to handle adding a role
async function handleAddRole(answers) {
  try {
    await addRole(answers.title, answers.salary, answers.department_id);
    console.log('Role added successfully!');
    promptMainMenu();
  } catch (error) {
    console.error('Error adding role:', error);
  }
}

// Function to prompt adding an employee
function promptAddEmployee() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'first_name',
        message: 'Enter the employee\'s first name:',
      },
      {
        type: 'input',
        name: 'last_name',
        message: 'Enter the employee\'s last name:',
      },
      {
        type: 'input',
        name: 'role_id',
        message: 'Enter the role ID:',
      },
      {
        type: 'input',
        name: 'manager_id',
        message: 'Enter the manager ID (if applicable, or leave blank):',
      },
    ])
    .then(handleAddEmployee);
}

// Function to handle adding an employee
async function handleAddEmployee(answers) {
  try {
    await addEmployee(answers.first_name, answers.last_name, answers.role_id, answers.manager_id);
    console.log('Employee added successfully!');
    promptMainMenu();
  } catch (error) {
    console.error('Error adding employee:', error);
    promptMainMenu();
  }
}
// Function to prompt updating an employee's role
function promptUpdateEmployeeRole() {
  // Fetch employees for choices
  db.query('SELECT * FROM employee')
    .then(([rows, fields]) => {
      const employeeChoices = rows.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
      }));
      
      inquirer
        .prompt([
          {
            type: 'list',
            name: 'employee_id',
            message: 'Select an employee to update:',
            choices: employeeChoices,
          },
          {
            type: 'input',
            name: 'role_id',
            message: 'Enter the new role ID:',
          },
        ])
        .then(handleUpdateEmployeeRole)
        .catch(error => {
          console.error('Error prompting for role update:', error);
          promptMainMenu();
        });
    })
    .catch(error => {
      console.error('Error fetching employee data:', error);
      promptMainMenu();
    });
}

// Function to handle updating an employee's role
async function handleUpdateEmployeeRole(answers) {
  try {
    await updateEmployeeRole(answers.employee_id, answers.role_id);
    console.log('Employee role updated successfully!');
    promptMainMenu();
  } catch (error) {
    console.error('Error updating employee role:', error);
    promptMainMenu();
  }
}

// Initial call to the main menu
promptMainMenu();