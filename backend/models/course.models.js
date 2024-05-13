const mongoose = require('mongoose');

// Define the course schema
const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  instructor: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  enrollmentStatus: {
    type: String,
    enum: ['Open', 'Closed', 'In Progress'],
    default: 'Open'
  },
  thumbnail: {
    type: String
  },
  duration: {
    type: String,
    required: true
  },
  schedule: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  prerequisites: {
    type: [String],
    default: []
  },
  likes: {
    type: Number,
    default: 0,
  },
  syllabus: [
    {
      week: {
        type: Number,
        required: true
      },
      topic: {
        type: String,
        required: true
      },
      content: {
        type: String,
        required: true
      }
    }
  ],
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

// Create the Course model
const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
