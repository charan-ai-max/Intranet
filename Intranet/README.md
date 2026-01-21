# Intranet

A small Intranet project with a React frontend and a Node backend. The original React template was replaced with a minimal custom app; this README describes how to set up and run the project locally.

---

## 🔧 Prerequisites

- Node.js (16+ recommended)
- npm (comes with Node) 
- MySQL (only if you plan to enable the backend DB integration)

---

## ⚙️ Setup

Install dependencies for each part of the repo:

```bash
# frontend
cd frontend
npm install

# backend
cd backend
npm install
```

---

## ▶️ Running locally

### Frontend (development)

```bash
cd frontend
npm start
```

- The dev server runs at: `http://localhost:3000` (default CRA port)

### Backend (development)

The backend currently has no `start` script defined and `index.js` is empty. To run a simple server directly:

```bash
cd backend
node index.js
# or for auto-reload during development:
npx nodemon index.js
```

To add helpful npm scripts to `backend/package.json`, add:

```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

---

## 🔐 Environment variables (suggested)

Create a `.env` (not checked into source control) with values your backend needs, e.g.: 

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=secret
DB_NAME=intranet
JWT_SECRET=your_jwt_secret
PORT=5000
```

> Tip: add a `.env.example` file that documents the required variables for new contributors.

---

## 📦 Build & Test

- Build the frontend for production:

```bash
cd frontend
npm run build
```

- Run frontend tests:

```bash
cd frontend
npm test
```

---

## 💡 Quick starter for backend

If you want a minimal server to start with, add this to `backend/index.js`:

```js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.json({ ok: true, message: 'Backend running' }));

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
```

Then run `node index.js` or `npm run dev` (after adding the `dev` script).

---

## 🧭 Next steps (recommended)

- Add a root-level `README` (done) and a short `CONTRIBUTING.md` if you expect others to contribute.
- Add `.env.example` showing required environment variables.
- Add basic tests and a CI workflow (GitHub Actions) to run lint/test/build on PRs.

---

If you want, I can (pick one):
- Add the suggested `backend/index.js` starter code and scripts for you, or
- Create a `.env.example`, or
- Add a simple GitHub Actions workflow to run tests and build.

Tell me which one you'd like next and I'll implement it.