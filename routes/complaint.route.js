/**
 * routes/complaint.route.js
 * 
 * Express Router mapping HTTP request methods and URL endpoints
 * to their respective controller functions in controllers/complaint.controller.js.
 * 
 * Mounted in index.js at the base path: /api/complaints
 */

const express = require('express');
const router = express.Router();

const {
  createComplaint,
  getAllComplaints,
  getComplaintById,
  updateComplaint,
  deleteComplaint
} = require('../controllers/complaint.controller');

// Route 1 & 2: Collection endpoints (Root /)
// POST   /api/complaints     -> Create a new complaint
// GET    /api/complaints     -> Get all complaints (sorted newest first)
router.route('/')
  .post(createComplaint)
  .get(getAllComplaints);

// Route 3, 4 & 5: Individual document endpoints by MongoDB ID (/:id)
// GET    /api/complaints/:id -> Get single complaint by ID
// PUT    /api/complaints/:id -> Update complaint / toggle status by ID
// DELETE /api/complaints/:id -> Delete complaint by ID
router.route('/:id')
  .get(getComplaintById)
  .put(updateComplaint)
  .delete(deleteComplaint);

module.exports = router;
