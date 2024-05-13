import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInLocalStorage, setIsInLocalStorage] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/courses/${courseId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch course details");
        }
        const data = await response.json();
        setCourse(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching course details:", error);
        setLoading(false);
      }
    };

    fetchCourseDetails();

    // Fetch cart items from local storage
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, [courseId]);

  // Function to handle adding a course to cart
  const handleAddToCart = () => {
    // Add the course to the cart
    const updatedCart = [...cart, course];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    // Update the state to reflect the change
    setIsInLocalStorage(true);
  };

  // Function to handle removing a course from cart
  const handleRemoveFromCart = () => {
    // Remove the course from the cart
    const updatedCart = cart.filter((item) => item._id !== courseId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    // Update the state to reflect the change
    setIsInLocalStorage(false);
  };

  return (
    <div className="mx-3 pb-8">
      <div className="max-w-[1280px] mx-auto">
        {loading ? (
          <div className="flex justify-center mt-8">
            <div className="loader">Loading.....</div>
          </div>
        ) : (
          <div>
            <img
              src={course.thumbnail}
              alt={course.name}
              className="w-full h-[300px] object-cover rounded-lg mb-4"
            />
            <h1 className="text-2xl font-semibold">{course.name}</h1>
            <p>Instructor: {course.instructor}</p>
            <p>Description: {course.description}</p>
            <p>Enrollment Status: {course.enrollmentStatus}</p>
            <p>Duration: {course.duration}</p>
            <p>Location: {course.location}</p>
            <p className="font-semibold">Prerequisites:</p>
            <ul>
              {course.prerequisites.map((prerequisite, index) => (
                <li key={index}>{prerequisite}</li>
              ))}
            </ul>
            <p className="font-semibold">Syllabus:</p>
            {course.syllabus.map((syllabus, index) => (
              <div key={index}>
                <h3>Week: {syllabus.week}</h3>
                <p>{syllabus.topic}</p>
              </div>
            ))}
            <div className="mt-4">
              {!isInLocalStorage ? (
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-md mr-2"
                  onClick={handleAddToCart}
                >
                  Buy
                </button>
              ) : (
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md mr-2"
                  onClick={handleRemoveFromCart}
                >
                  Remove the subscription
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetailPage;
