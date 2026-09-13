import * as queue from '../priorityQueue.js';

export async function addItem(req, res) {
  try {
    const { item, priority } = req.body;
    const row = await queue.insert(item, priority);
    res.status(201).json(row);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function peekItem(req, res) {
  try {
    const order = req.query.order || 'min';
    const row = await queue.peek(order);
    if (!row) return res.status(404).json({ error: 'queue is empty' });
    res.json(row);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function extractItem(req, res) {
  try {
    const order = req.query.order || 'min';
    const row = order === 'max' ? await queue.extractMax() : await queue.extractMin();
    if (!row) return res.status(404).json({ error: 'queue is empty' });
    res.json(row);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateItem(req, res) {
  try {
    const { priority } = req.body;
    const row = await queue.update(req.params.id, priority);
    if (!row) return res.status(404).json({ error: 'not found' });
    res.json(row);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function deleteItem(req, res) {
  try {
    const ok = await queue.remove(req.params.id);
    if (!ok) return res.status(404).json({ error: 'not found' });
    res.json({ message: 'deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function checkEmpty(req, res) {
  try {
    const empty = await queue.isEmpty();
    res.json({ empty });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
