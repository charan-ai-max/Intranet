const express = require('express');
const db = require('../db');
const authenticateToken = require('../middleware/auth');
const authorizeRoles = require('../middleware/role');

const router = express.Router();

// GET /api/attendance/:courseId - Get attendance for a course (faculty or admin)
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
      SELECT a.id, a.date, a.status, u.name AS student_name, e.student_id
      FROM attendance a
      JOIN enrollments e ON a.enrollment_id = e.id
      JOIN users u ON e.student_id = u.id
      WHERE e.course_id = ?
      ORDER BY a.date DESC, u.name
    `, [courseId]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/attendance - Mark attendance (faculty or admin)
router.post('/', authenticateToken, authorizeRoles('ADMIN', 'FACULTY'), async (req, res) => {
  try {
    const { courseId, studentId, date, status } = req.body;

    if (!courseId || !studentId || !date || !status) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    if (!['present', 'absent'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
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
      INSERT INTO attendance (enrollment_id, date, status) VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE status = VALUES(status)
    `, [enrollment[0].id, date, status]);

    res.json({ message: 'Attendance marked' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;