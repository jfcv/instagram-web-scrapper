import {Pool} from 'pg'

export const pool = new Pool({
   connectionString: process.env.NEXT_PUBLIC_POOL_URI,
   ssl: { rejectUnauthorized: false }
});