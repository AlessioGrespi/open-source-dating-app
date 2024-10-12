// import pkg from 'pg';
// const { Pool } = pkg;
// import { drizzle } from 'drizzle-orm/node-postgres';

// // const pool = new Pool({
// //   host: process.env.DB_HOST,
// //   user: process.env.DB_USER,
// //   password: process.env.DB_PASSWORD,
// //   database: process.env.DB_NAME,
// //   ssl: false
// // });
// const pool = new Pool({
//   connectionString: process.env.DB_URL,
// });

// export const db = drizzle(pool);

// import { drizzle } from 'drizzle-orm/connect';

// export const db = await drizzle("node-postgres", process.env.DB_URL);

// import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
// import { drizzle } from "drizzle-orm/node-postgres";
import pkg from 'pg';
const {Pool} = pkg;


// export const pool = new Pool({
//  connectionString: `${process.env.DB_URL}`,
// });
// export const db = drizzle(pool);

import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
// import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DB_URL!,
});
export const db = drizzle(pool);