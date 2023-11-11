import pg from 'pg';
const { Pool } = pg;

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

//console.log(process.env.TOKEN_SECRET);

const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
});

pool.connect((error) => {
  if (error) {
    console.log('DataBase connecton error ');
    console.log(error);
    throw error;
  } else {
    console.log('Successful connection to DataBase');
  }
});

export default pool;

//https://www.makeuseof.com/node-postgresql-connect-how/
