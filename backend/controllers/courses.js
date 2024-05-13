const Course = require("../models/course.models");
const User = require("../models/user.models");

// Controller function to add a new course
exports.addCourse = async (req, res) => {
  try {
    // Extract course data from the request body
    const {
      name,
      instructor,
      description,
      enrollmentStatus,
      thumbnail,
      duration,
      schedule,
      location,
      prerequisites,
      syllabus,
    } = req.body;

    // Create a new course instance
    const course = new Course({
      name,
      instructor,
      description,
      enrollmentStatus,
      thumbnail,
      duration,
      schedule,
      location,
      prerequisites,
      syllabus,
    });

    // Save the course to the database
    await course.save();

    res.status(201).json({ success: true, data: course });
  } catch (error) {
    // Handle error
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getAllCourse = async (req, res) => {
  try {
    const courses = await Course.find();
    return res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error in getting all courses",
      error: err.message,
    });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    // Find the course by its ID
    const course = await Course.findById(courseId);

    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    res.status(200).json({ success: true, data: course });
  } catch (error) {
    // Handle error
    res.status(500).json({ success: false, error: error.message });
  }
};
