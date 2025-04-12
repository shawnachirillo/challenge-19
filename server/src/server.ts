import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import db from './config/connection.js';
import routes from './routes/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

await db();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Mount all API routes
app.use(routes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  console.log('🛠 Serving production build...');
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
} else {
  console.log('⚙️ Running in development mode — not serving static files.');
}

app.listen(PORT, () => {
  console.log(`🚀 API server running on port ${PORT}!`);
});
