const db = require('./db/connection'); 

async function viewDepartments() {
  try {
    const [rows, fields] = await db.query('SELECT * FROM department');
    console.log(rows);
  } catch (error) {
    console.error('Error querying database:', error);
  }
}

viewDepartments(); // Call the function