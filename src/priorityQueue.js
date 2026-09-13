import pool from '../db.js';

// A lower priority number means higher priority (min-heap style).

export async function insert(item, priority) {
  const result = await pool.query(
    'INSERT INTO priority_queue (item, priority) VALUES ($1, $2) RETURNING *',
    [item, priority]
  );
  return result.rows[0];
}

export async function peek(order = 'min') {
  const direction = order === 'max' ? 'DESC' : 'ASC';
  const result = await pool.query(
    `SELECT * FROM priority_queue ORDER BY priority ${direction}, id ASC LIMIT 1`
  );
  return result.rows[0] || null;
}

export async function extractMin() {
  const top = await peek('min');
  if (!top) return null;
  await pool.query('DELETE FROM priority_queue WHERE id = $1', [top.id]);
  return top;
}

export async function extractMax() {
  const top = await peek('max');
  if (!top) return null;
  await pool.query('DELETE FROM priority_queue WHERE id = $1', [top.id]);
  return top;
}

export async function update(id, newPriority) {
  const result = await pool.query(
    'UPDATE priority_queue SET priority = $1 WHERE id = $2 RETURNING *',
    [newPriority, id]
  );
  return result.rows[0] || null;
}

export async function remove(id) {
  const result = await pool.query(
    'DELETE FROM priority_queue WHERE id = $1',
    [id]
  );
  return result.rowCount > 0;
}

export async function isEmpty() {
  const result = await pool.query('SELECT COUNT(*) FROM priority_queue');
  return Number(result.rows[0].count) === 0;
}
