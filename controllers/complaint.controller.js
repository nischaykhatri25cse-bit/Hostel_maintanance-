/**
 * controllers/complaint.controller.js
 * 
 * Express Controller functions implementing all 5 CRUD operations
 * for the "FixMyRoom" Hostel Maintenance & Complaint Tracker.
 * 
 * Each function handles a specific route logic, interacts with MongoDB
 * via Mongoose, and sends an appropriate HTTP response.
 */

const mongoose = require('mongoose');
const Complaint = require('../models/complaint.model');

// =============================================================================
// 1. CREATE: POST /api/complaints
// Purpose: Create a new complaint record in the database.
// Status Code: 201 Created on success, 400 on validation failure, 500 on server error.
// =============================================================================
exports.createComplaint = async (req, res) => {
  try {
    const { studentName, roomNumber, category, description, status } = req.body;

    // Instantiate and save the new complaint document
    const newComplaint = await Complaint.create({
      studentName,
      roomNumber,
      category,
      description,
      status: status || 'Pending'
    });

    // Return 201 Created with the new complaint JSON object
    return res.status(201).json(newComplaint);
  } catch (error) {
    // Handle Mongoose validation errors (e.g. missing required fields or invalid category)
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validation Error',
        error: error.message
      });
    }
    return res.status(500).json({
      message: 'Failed to create complaint',
      error: error.message
    });
  }
};

// =============================================================================
// 2. READ ALL: GET /api/complaints
// Purpose: Retrieve all complaints from MongoDB, sorted newest first.
// Status Code: 200 OK with a JSON array.
// =============================================================================
exports.getAllComplaints = async (req, res) => {
  try {
    // sort({ createdAt: -1 }) ensures the most recent complaints appear first
    const complaints = await Complaint.find().sort({ createdAt: -1 });

    // Return 200 OK with the array of complaint documents
    return res.status(200).json(complaints);
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to retrieve complaints',
      error: error.message
    });
  }
};

// =============================================================================
// 3. READ ONE: GET /api/complaints/:id
// Purpose: Retrieve a single complaint document by its unique MongoDB _id.
// Status Code: 200 OK if found, 400 if ID format is invalid, 404 if not found.
// =============================================================================
exports.getComplaintById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if the provided ID is a valid 24-character hexadecimal ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid complaint ID format' });
    }

    const complaint = await Complaint.findById(id);

    // If no document was found with this ID
    if (!complaint) {
      return res.status(404).json({ message: `Complaint with ID ${id} not found` });
    }

    // Return 200 OK with the complaint document
    return res.status(200).json(complaint);
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to fetch complaint',
      error: error.message
    });
  }
};

// =============================================================================
// 4. UPDATE: PUT /api/complaints/:id
// Purpose: Update complaint details or toggle status ('Pending' <-> 'Resolved').
// Options:
//   - new: true -> Returns the updated document instead of the original one
//   - runValidators: true -> Ensures Schema validations (e.g. enum check) run on updates
// Status Code: 200 OK on success, 400 on validation failure, 404 if not found.
// =============================================================================
exports.updateComplaint = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid complaint ID format' });
    }

    // Update document in MongoDB
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    // If complaint does not exist
    if (!updatedComplaint) {
      return res.status(404).json({ message: `Complaint with ID ${id} not found` });
    }

    // Return 200 OK with updated complaint JSON object
    return res.status(200).json(updatedComplaint);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validation Error',
        error: error.message
      });
    }
    return res.status(500).json({
      message: 'Failed to update complaint',
      error: error.message
    });
  }
};

// =============================================================================
// 5. DELETE: DELETE /api/complaints/:id
// Purpose: Remove a complaint document permanently from MongoDB by its _id.
// Status Code: 200 OK with confirmation message, 400 if invalid ID, 404 if not found.
// =============================================================================
exports.deleteComplaint = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid complaint ID format' });
    }

    const deletedComplaint = await Complaint.findByIdAndDelete(id);

    // If complaint does not exist
    if (!deletedComplaint) {
      return res.status(404).json({ message: `Complaint with ID ${id} not found` });
    }

    // Return 200 OK with confirmation message and deleted ID
    return res.status(200).json({
      success: true,
      message: 'Complaint deleted successfully',
      deletedId: id
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to delete complaint',
      error: error.message
    });
  }
};
