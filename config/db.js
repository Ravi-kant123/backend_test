import pg, { Connection } from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const {Pool} = pg;

const pool = new Pool({ConnectionString: procees.env.DATABASE_URL ,})

export default pool;

