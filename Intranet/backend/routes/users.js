const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db');
const authenticateToken = require('../middleware/auth');
const authorizeRoles = require('../middleware/role');

const router = express.Router();

// GET /api/users - Get all users (admin only)
router.get('/', authenticateToken, authorizeRoles('ADMIN'), async (req, res) => {
  try {
    const [rows] = await db.pool.query('SELECT id, name, email, role, designation, created_at FROM users');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/users - Create a new user (admin only)
router.post('/', authenticateToken, authorizeRoles('ADMIN'), async (req, res) => {
  try {
    const { name, email, password, role, designation } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!['ADMIN', 'FACULTY', 'STUDENT'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.pool.query(
      'INSERT INTO users (name, email, password_hash, role, designation) VALUES (?, ?, ?, ?, ?)',
      [name, email, hashedPassword, role, designation || null]
    );

    res.status(201).json({ id: result.insertId, message: 'User created' });
  } catch (err) {
    console.error(err);
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/users/:id - Update user (admin or self)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, designation } = req.body;

    // Allow admin to update any, or user to update self
    if (req.role !== 'ADMIN' && req.userId != id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const updates = [];
    const values = [];

    if (name) {
      updates.push('name = ?');
      values.push(name);
    }
    if (email) {
      updates.push('email = ?');
      values.push(email);
    }
    if (role && req.role === 'ADMIN') {
      if (!['ADMIN', 'FACULTY', 'STUDENT'].includes(role)) {
        return res.status(400).json({ error: 'Invalid role' });
      }
      updates.push('role = ?');
      values.push(role);
    }
    if (designation !== undefined && req.role === 'ADMIN') {
      updates.push('designation = ?');
      values.push(designation);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    values.push(id);
    const sql = `UPDATE users SET ${updates.join(', ')} WHERE id = ?`;

    await db.pool.query(sql, values);
    res.json({ message: 'User updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/users/:id - Delete user (admin only)
router.delete('/:id', authenticateToken, authorizeRoles('ADMIN'), async (req, res) => {
  try {
    const { id } = req.params;
    await db.pool.query('DELETE FROM users WHERE id = ?', [id]);
    res.json({ message: 'User deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;