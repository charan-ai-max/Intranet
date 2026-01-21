require('dotenv').config();
const db = require('../db');

(async function init() {
  try {
    await db.initSchema();
    console.log('Database initialized (tables created if not present)');
    process.exit(0);
  } catch (err) {
    console.error('Error initializing DB:', err);
    process.exit(1);
  }
})();
