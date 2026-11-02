/**
 * models/complaint.model.js
 * 
 * Mongoose Schema and Model definition for Hostel Maintenance & Complaint Tracker.
 * This model defines the shape of complaint documents stored inside MongoDB Atlas.
 */

const mongoose = require('mongoose');

// Define the Complaint Schema
const complaintSchema = new mongoose.Schema(
  {
    // Full name of the student lodging the complaint
    studentName: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true
    },
    // Assigned hostel room number (e.g., "B-204")
    roomNumber: {
      type: String,
      required: [true, 'Room number is required'],
      trim: true
    },
    // Category restricted to specific hostel maintenance domains
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: ['Wi-Fi', 'Electrical', 'Plumbing', 'Furniture'],
        message: '{VALUE} is not a valid category. Must be Wi-Fi, Electrical, Plumbing, or Furniture.'
      }
    },
    // Detailed description of the problem/issue
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true
    },
    // Current status of the complaint: default is 'Pending'
    status: {
      type: String,
      enum: {
        values: ['Pending', 'Resolved'],
        message: '{VALUE} is not a valid status. Must be Pending or Resolved.'
      },
      default: 'Pending'
    }
  },
  {
    // Automatically creates and manages 'createdAt' and 'updatedAt' fields
    timestamps: true
  }
);

// Compile schema into a Mongoose Model and export
// MongoDB will automatically create a collection named 'complaints' (pluralized, lowercase)
const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;
