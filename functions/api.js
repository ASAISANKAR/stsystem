const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'ssns.mysql.pythonanywhere-services.com',
    user: 'ssns',
    password: 'ssnsssns',
    database: 'ssns$iot'
});

exports.handler = async (event) => {
    return new Promise((resolve) => {
        db.connect((err) => {
            if (err) {
                console.error('Error connecting to MySQL:', err);
                resolve({
                    statusCode: 500,
                    body: JSON.stringify({ message: 'Failed to connect to database' }),
                });
            } else {
                console.log('Connected to MySQL');
                resolve({
                    statusCode: 200,
                    body: JSON.stringify({ message: 'Successfully connected to the database' }),
                });
            }
        });
    });
};
