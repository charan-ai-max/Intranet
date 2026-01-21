const express = require('express');
const db = require('../db');
const authenticateToken = require('../middleware/auth');
const authorizeRoles = require('../middleware/role');

const router = express.Router();

// GET /api/results/:courseId - Get results for a course (faculty or admin)
router.get('/:courseId', authenticateToken, async (req, res) => {
  try {
    const { courseId } = req.params;

    // Check course ownership
    const [course] = await db.pool.query('SELECT faculty_id FROM courses WHERE id = ?', [courseId]);
    if (!course.length) {
      return res.status(404).json({ error: 'Course not found' });
    }
    if (req.role !== 'ADMIN' && course[0].faculty_id != req.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const [rows] = await db.pool.query(`
      SELECT r.id, r.grade, u.name AS student_name, e.student_id
      FROM results r
      JOIN enrollments e ON r.enrollment_id = e.id
      JOIN users u ON e.student_id = u.id
      WHERE e.course_id = ?
    `, [courseId]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/results - Add/update result (faculty or admin)
router.post('/', authenticateToken, authorizeRoles('ADMIN', 'FACULTY'), async (req, res) => {
  try {
    const { courseId, studentId, grade } = req.body;

    if (!courseId || !studentId || !grade) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    // Check course ownership
    const [course] = await db.pool.query('SELECT faculty_id FROM courses WHERE id = ?', [courseId]);
    if (!course.length) {
      return res.status(404).json({ error: 'Course not found' });
    }
    if (req.role !== 'ADMIN' && course[0].faculty_id != req.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Get enrollment ID
    const [enrollment] = await db.pool.query('SELECT id FROM enrollments WHERE student_id = ? AND course_id = ?', [studentId, courseId]);
    if (!enrollment.length) {
      return res.status(404).json({ error: 'Student not enrolled' });
    }

    // Insert or update
    await db.pool.query(`
      INSERT INTO results (enrollment_id, grade) VALUES (?, ?)
      ON DUPLICATE KEY UPDATE grade = VALUES(grade)
    `, [enrollment[0].id, grade]);

    res.json({ message: 'Result updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/results/student - Get student's results (student only)
router.get('/student/me', authenticateToken, authorizeRoles('STUDENT'), async (req, res) => {
  try {
    const [rows] = await db.pool.query(`
      SELECT c.name AS course_name, r.grade
      FROM results r
      JOIN enrollments e ON r.enrollment_id = e.id
      JOIN courses c ON e.course_id = c.id
      WHERE e.student_id = ?
    `, [req.userId]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;