const sqlite3 = require('sqlite3');
const {INIT} = require('./statements');

const DATABASE_PATH = process.env.DATABASE_PATH || 'data.sqlite';

const db = new Promise((resolve, reject) => {
	const conn = new sqlite3.Database(DATABASE_PATH);
	
	conn.exec(INIT, err => err ? reject(err) : resolve(conn));
});

module.exports = db;
