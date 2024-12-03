#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();
const SQL = `
CREATE TABLE IF NOT EXISTS users (  
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
email VARCHAR(255),
password VARCHAR(255),
firstname VARCHAR(255),
lastname VARCHAR(255),
memberstatus BOOLEAN
);

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  userid INTEGER REFERENCES users (id) ON DELETE CASCADE,
  title VARCHAR(255),
  message VARCHAR (255),
  posted TIMESTAMP NOT NULL DEFAULT NOW()::TIMESTAMP
)

`;

async function main() {
	console.log("seeding...");
	const client = new Client({
		connectionString: `postgresql://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}/${process.env.DBNAME}`,
	});
	await client.connect();
	await client.query(SQL);
	await client.end();
	console.log("done");
}

main();
