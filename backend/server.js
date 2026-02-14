const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('./db');
const initDB = require('./initDB');
const seedDB = require('./seedDB');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const studentRoutes = require('./routes/student');
const facultyRoutes = require('./routes/faculty');

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/faculty', facultyRoutes);

const startServer = async () => {
    try {
        console.log('Starting system initialization...');

        // 1. Ensure Database and Schema exist
        await initDB();

        // 2. Test Connection Pool
        await pool.query('SELECT 1');
        console.log('Connected to MySQL database via Pool');

        // 3. Seed Initial Data (Admin, Faculty, Students)
        await seedDB();

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error('FATAL DATABASE ERROR:', err.message);
        console.log('\n--- HOW TO FIX ---');
        console.log('1. Ensure your MySQL Server is running.');
        console.log('2. Check backend/.env and set DB_PASSWORD correctly.');
        console.log(`3. Current Config: Host=${process.env.DB_HOST}, User=${process.env.DB_USER}, DB=${process.env.DB_NAME}\n`);

        // Start server in recovery mode so frontend doesn't crash on connection
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server started in recovery mode on port ${PORT} (Check console for errors)`);
        });
    }
};

startServer();
