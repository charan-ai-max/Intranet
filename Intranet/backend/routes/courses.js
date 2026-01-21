const express = require('express');
const db = require('../db');
const authenticateToken = require('../middleware/auth');
const authorizeRoles = require('../middleware/role');

const router = express.Router();

// GET /api/courses - Get all courses
router.get('/', authenticateToken, async (req, res) => {
  try {
    let sql, values = [];

    if (req.role === 'STUDENT') {
      // Students see only enrolled courses
      sql = `
        SELECT c.id, c.name, c.description, c.faculty_id, u.name AS faculty_name, e.status
        FROM courses c
        JOIN enrollments e ON c.id = e.course_id
        JOIN users u ON c.faculty_id = u.id
        WHERE e.student_id = ?
      `;
      values = [req.userId];
    } else if (req.role === 'FACULTY') {
      // Faculty see their courses
      sql = `
        SELECT c.id, c.name, c.description, c.faculty_id, u.name AS faculty_name
        FROM courses c
        JOIN users u ON c.faculty_id = u.id
        WHERE c.faculty_id = ?
      `;
      values = [req.userId];
    } else {
      // Admin sees all
      sql = `
        SELECT c.id, c.name, c.description, c.faculty_id, u.name AS faculty_name
        FROM courses c
        JOIN users u ON c.faculty_id = u.id
      `;
    }

    const [rows] = await db.pool.query(sql, values);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/courses - Create course (faculty or admin)
router.post('/', authenticateToken, authorizeRoles('ADMIN', 'FACULTY'), async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Course name required' });
    }

    const facultyId = req.role === 'ADMIN' ? req.body.faculty_id : req.userId;

    if (!facultyId) {
      return res.status(400).json({ error: 'Faculty ID required' });
    }

    const [result] = await db.pool.query(
      'INSERT INTO courses (name, description, faculty_id) VALUES (?, ?, ?)',
      [name, description || '', facultyId]
    );

    res.status(201).json({ id: result.insertId, message: 'Course created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/courses/:id - Update course (faculty who owns or admin)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    // Check ownership
    const [course] = await db.pool.query('SELECT faculty_id FROM courses WHERE id = ?', [id]);
    if (!course.length) {
      return res.status(404).json({ error: 'Course not found' });
    }
    if (req.role !== 'ADMIN' && course[0].faculty_id != req.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const updates = [];
    const values = [];
    if (name) {
      updates.push('name = ?');
      values.push(name);
    }
    if (description !== undefined) {
      updates.push('description = ?');
      values.push(description);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    values.push(id);
    const sql = `UPDATE courses SET ${updates.join(', ')} WHERE id = ?`;
    await db.pool.query(sql, values);
    res.json({ message: 'Course updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/courses/:id - Delete course (faculty who owns or admin)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const [course] = await db.pool.query('SELECT faculty_id FROM courses WHERE id = ?', [id]);
    if (!course.length) {
      return res.status(404).json({ error: 'Course not found' });
    }
    if (req.role !== 'ADMIN' && course[0].faculty_id != req.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    await db.pool.query('DELETE FROM courses WHERE id = ?', [id]);
    res.json({ message: 'Course deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/courses/:id/enroll - Enroll student (student only)
router.post('/:id/enroll', authenticateToken, authorizeRoles('STUDENT'), async (req, res) => {
  try {
    const { id } = req.params;

    // Check if course exists
    const [course] = await db.pool.query('SELECT id FROM courses WHERE id = ?', [id]);
    if (!course.length) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Check if already enrolled
    const [existing] = await db.pool.query('SELECT id FROM enrollments WHERE student_id = ? AND course_id = ?', [req.userId, id]);
    if (existing.length) {
      return res.status(409).json({ error: 'Already enrolled' });
    }

    await db.pool.query('INSERT INTO enrollments (student_id, course_id) VALUES (?, ?)', [req.userId, id]);
    res.json({ message: 'Enrolled successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/courses/:id/students - Get enrolled students (faculty who owns or admin)
router.get('/:id/students', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const [course] = await db.pool.query('SELECT faculty_id FROM courses WHERE id = ?', [id]);
    if (!course.length) {
      return res.status(404).json({ error: 'Course not found' });
    }
    if (req.role !== 'ADMIN' && course[0].faculty_id != req.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const [rows] = await db.pool.query(`
      SELECT u.id, u.name, u.email, e.status, e.enrolled_at
      FROM enrollments e
      JOIN users u ON e.student_id = u.id
      WHERE e.course_id = ?
    `, [id]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;