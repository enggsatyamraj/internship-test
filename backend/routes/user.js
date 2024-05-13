const express = require("express");
const { addCourse, getAllCourse, getCourseById} = require("../controllers/courses");
const router = express.Router();


router.post("/addcourse",addCourse);
router.get("/getallcourse",getAllCourse)
router.get("/getsinglecourse",getCourseById);
router.get('/courses/:courseId', getCourseById);

module.exports = router;