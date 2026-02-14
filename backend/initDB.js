const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const initDB = async () => {
    // 1. Create a temporary connection without specifying a database
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        multipleStatements: true
    });

    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    try {
        console.log('Ensuring database exists...');
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
        await connection.query(`USE \`${process.env.DB_NAME}\`;`);

        console.log('Initializing schema...');
        await connection.query(schema);

        console.log('Database schema initialized successfully');
    } catch (err) {
        console.error('Error during database initialization:', err.message);
        throw err;
    } finally {
        await connection.end();
    }
};

module.exports = initDB;
