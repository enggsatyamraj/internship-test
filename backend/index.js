const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
require("./config/database").connectWithDb();
const user = require("./routes/user");
const Course = require("./models/course.models"); // Import Course model

// Set up HTTP server
const server = http.createServer(app);
const io = socketIo(server);

// WebSocket connection event
io.on("connection", (socket) => {
  console.log("Client connected");
  
  // Function to send likes count for a specific course
  const sendLikesCount = async (courseId) => {
    try {
      const course = await Course.findById(courseId);
      if (!course) {
        throw new Error("Course not found");
      }
      socket.emit(`likesCount_${courseId}`, course.likes);
    } catch (error) {
      console.error(error.message);
    }
  };

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Routes
app.use("/api/v1", user);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
