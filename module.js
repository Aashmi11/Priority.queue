import app from './src/app.js';
import { initDb } from './db.js';

const PORT = process.env.PORT || 3000;

async function start() {
  await initDb();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

start();
