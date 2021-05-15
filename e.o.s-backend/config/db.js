const mysql = require('mysql'); // importing the mysql package to perform database operations

let ConnectionPool; // use a connection to ensure database connections don't die

ConnectionPool = mysql.createPool({
    // a connection pool will ensure that you have at least one available database connection
    host: 'localhost', // the pc/server on which the database is located
    port: 3306, // the default db port (ports are simply put points of connection btn services)
    user: 'root', // user name for connecting to the database
    password: '',
    database: 'jen_commerce', // the name of the database we're connecting to
    connectionLimit: 30 //total
});

/*
    ConnectionPool = mysql.createPool({
    host: 'ao9moanwus0rjiex.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    port: 3306,
    user: 'ngckzm5ezhncjtp0',
    password: 'mzlhyrgpgb61rpc6',
    database: 'upv2k1le2r1cwz1x',
    connectionLimit: 30
});

*/

// creating a database connection
ConnectionPool.getConnection(function database(err, connection) {
    // callback function in order to check for errors while connecting to the database
    if (err) {
        console.log(`Got err code: ${err.code}`);
        switch (err.code) {
            case 'PROTOCOL_CONNECTION_LOST':
                console.log('Database connection closed unexpectedly');
                break;

            case 'ER_CON_COUNT_ERROR':
                console.log('Too many Database Connections')
                break;

            case 'ECONNREFUSED':
                console.log('Database connections refused, Check credentials');
                break;

            case 'ETIMEOUT':
                console.log('Connection Timed Out!');
                break;

            default:
                console.log(`Got err code: ${err.code} with message: ${err.message}`);
        }
    } else {
        console.log(`Connection Established`);
        connection.release()
    }
});

module.exports = ConnectionPool;