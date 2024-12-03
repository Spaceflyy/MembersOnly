const { Pool } = require("pg");
require("dotenv").config();
module.exports = new Pool({
	connectionString: `postgresql://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}/${process.env.DBNAME}`,
});
