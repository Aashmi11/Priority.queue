import express from 'express';
import {
  addItem,
  peekItem,
  extractItem,
  updateItem,
  deleteItem,
  checkEmpty,
} from '../controllers/queueController.js';

const router = express.Router();

router.post('/items', addItem);
router.get('/peek', peekItem);
router.post('/extract', extractItem);
router.patch('/items/:id', updateItem);
router.delete('/items/:id', deleteItem);
router.get('/empty', checkEmpty);

export default router;
