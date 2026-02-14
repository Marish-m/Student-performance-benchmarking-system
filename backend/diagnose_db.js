const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

const diagnose = async () => {
    console.log('--- DATABASE DIAGNOSTIC ---');
    console.log(`Host: ${process.env.DB_HOST}`);
    console.log(`User: ${process.env.DB_USER}`);
    console.log(`Database: ${process.env.DB_NAME}`);
    console.log(`Password: ${process.env.DB_PASSWORD ? '********' : '(empty)'}`);

    try {
        console.log('\n1. Attempting to connect to MySQL...');
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        });
        console.log('✅ Connection Successful!');

        console.log('\n2. Attempting to create/use database...');
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
        await connection.query(`USE \`${process.env.DB_NAME}\`;`);
        console.log('✅ Database Ready!');

        await connection.end();
        console.log('\nSUCCESS: Database setup is correct.');
    } catch (err) {
        console.error('\n❌ ERROR FOUND:');
        console.error(`Code: ${err.code}`);
        console.error(`Message: ${err.message}`);

        if (err.code === 'ER_ACCESS_DENIED_ERROR') {
            console.log('\nPOSSIBLE CAUSE: Your MySQL password is incorrect or empty.');
        } else if (err.code === 'ECONNREFUSED') {
            console.log('\nPOSSIBLE CAUSE: MySQL Server is not running on this machine.');
        }
    }
};

diagnose();
