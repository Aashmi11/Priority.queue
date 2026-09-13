import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT || 5432),
  user: process.env.POSTGRES_USER || 'ppq_user',
  password: process.env.POSTGRES_PASSWORD || 'ppq_pass',
  database: process.env.POSTGRES_DB || 'ppq_db',
});

// Create the table if it doesn't exist yet.
export async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS priority_queue (
      id SERIAL PRIMARY KEY,
      item JSONB NOT NULL,
      priority INT NOT NULL
    );
  `);
  console.log('DB connected');
}

export default pool;
