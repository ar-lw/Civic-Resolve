import mysql from 'mysql2';

// Create a connection pool to the database
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '175369', // Replace with your password
    database: 'civic_resolve'   // Replace with your database name
}).promise();

// Export the connection pool to be used by other files
export default pool;